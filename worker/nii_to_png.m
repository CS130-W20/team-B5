function [] = nii_to_png (nii_dir,imageDir,labelDir,prefix)

delete(fullfile(imageDir,'*'));
delete(fullfile(labelDir,'*'));
files = dir(nii_dir);
masks = {files(cellfun(@(x) x==0,{files.isdir}) & cellfun(@(x) contains(x,'mask'),{files.name})).name};
images = {files(cellfun(@(x) x==0,{files.isdir}) & cellfun(@(x) ~contains(x,'mask'),{files.name})).name};
masks=sort(masks);
images=sort(images);

counter=1;
for i = 1:length(masks)
    disp(i);
    image_file_name = fullfile(nii_dir,images{i});
    mask_file_name = fullfile(nii_dir,masks{i});
    image = permute(niftiread(image_file_name),[1 3 2]);
    mask = permute(niftiread(mask_file_name),[1 3 2]);
    for z = 20:165
        image_slice = image(:,:,z);
        mask_slice = mask(:,:,z);
        imwrite(uint16(image_slice),fullfile(imageDir,strcat( prefix,'img_',sprintf( '%06d', counter ),'.png')));
        imwrite(uint8(mask_slice),fullfile(labelDir,strcat(prefix, 'label_' ,sprintf( '%06d', counter ),'.png')));
        counter = counter + 1;
    end
end

end

