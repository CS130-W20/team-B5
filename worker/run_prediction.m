function [] = run_prediction(task)

mkdir (strcat(tempdir,'brainai'));
mkdir (strcat(tempdir,'brainai\\','unzip'));
unzipLocation= (strcat(tempdir,'brainai\\','unzip'));
unzip(task.location{1},unzipLocation);
if exist(strcat(tempdir,'brainai\\','unzip\\','maskOutput'),'dir')
    rmdir(strcat(tempdir,'brainai\\','unzip\\','maskOutput'), 's');
end
mkdir (strcat(tempdir,'brainai\\','unzip\\','maskOutput'));
resultLocation=strcat(tempdir,'brainai\\','unzip\\','maskOutput');
imagesLocation = fullfile(unzipLocation,'images',"*nii*");
images = dir(imagesLocation);

netLocation = task.location_1{1};
net=load(netLocation);
fields = fieldnames(net);
net = getfield(net,fields{1});


for i=1:length(images)
    counter = 0;
    
    
    imagefile = fullfile(images(i).folder, images(i).name);
    info = niftiinfo(imagefile);
    I = imwarp(niftiread(imagefile),info.Transform);
    O = zeros(size(I));
    orig_sz=[size(I,3),size(I,2)];
    for z=1:size(I,1)
        percentage = (i-1)/length(images)+z/size(I,1)/length(images);
        counter = counter + 1;
        if(mod(counter,40)==0)
            set_percentage(percentage*100,task.id);
        end
        input_image = imresize(flip(squeeze(I(z,:,:))'),[224,224]);
        result=imresize(semanticseg(input_image,net),orig_sz);
        result = flip(result)';
        O(z,:,:)= single(result)==1;
    end
    O = single(imwarp(O,invert(info.Transform)));
    O = O(1:info.ImageSize(1),1:info.ImageSize(2),1:info.ImageSize(3));
    
    output_file_name = strsplit(images(i).name,'.');
    output_file_name = strcat(output_file_name{1},'_mask');
    niftiwrite(O,fullfile(resultLocation,output_file_name),info);
end

zip(task.location{1},{'*'},unzipLocation);%overwrite!!
rmdir(strcat(tempdir,'brainai'), 's')

set_percentage(100,task.id);

end

