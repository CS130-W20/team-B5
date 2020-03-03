function [] = train_model(task)
batchSize=64;
maxIteration=100;
mkdir (strcat(tempdir,'brainai'));
mkdir (strcat(tempdir,'brainai\\','unzip'));
mkdir (strcat(tempdir,'brainai\\','label_img'));
mkdir (strcat(tempdir,'brainai\\','data_img'));
mkdir (strcat(tempdir,'brainai\\unzip\','preview'));
unzipLocation= (strcat(tempdir,'brainai\\','unzip'));
unzip(task.location{1},unzipLocation)
images = dir(fullfile(unzipLocation,'images/','*nii*'));
images = sort({images.name});
masks = dir(fullfile(unzipLocation,'ground truth/','*nii*'));
masks = sort({masks.name});
modelsDir = tempdir;

imageDir=strcat(tempdir,'brainai\\','data_img\\');
labelDir=strcat(tempdir,'brainai\\','label_img\\');
prefix='';

counter=1;
for i = 1:length(masks)
    image_file_name = fullfile(unzipLocation,'images/',images{i});
    mask_file_name = fullfile(unzipLocation,'ground truth/',masks{i});
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

imageSize = [224 224 3];
numClasses = 2;
lgraph = deeplabv3plusLayers(imageSize,numClasses,'resnet18');
lgraph = replaceLayer(lgraph,'data',[imageInputLayer(imageSize, "Name",'ImageInputLayer',"Normalization","zscore")]);
lgraph = replaceLayer(lgraph,'classification',[pixelClassificationLayer('Name','Segmentation-Layer','Classes',["brain","background"], ...
  'ClassWeights', [4.3,1])]);

imds = imageDatastore(imageDir);
classNames = ["brain","background"];
labelIDs   = [1 0];
pxds = pixelLabelDatastore(labelDir,classNames,labelIDs);
ds = pixelLabelImageDatastore(imds,pxds,"OutputSize",imageSize,'ColorPreprocessing','gray2rgb');

global metadata;
options = trainingOptions('sgdm', ...
    'InitialLearnRate',2e-3, ...
    'MaxEpochs',200, ...
    'MiniBatchSize',batchSize,... % can be 64
    "Shuffle","every-epoch",...
    'Verbose',0, ...
    'OutputFcn',@(info)dbStopFunction(info,task.id,maxIteration));

net = trainNetwork(ds,lgraph,options);
%create model here
% copy model + update database
netFile=fullfile(modelsDir,strcat(datestr(datetime('now'),'mm_dd_yy_HH_MM_SS_FFF'),'out.mat'));
save(netFile,'net');
conn = dbconn();
query = strcat('insert into models set owner= ',int2str(task.owner),' , location= ''',netFile,''', metadata=''',jsonencode(metadata),''',name= ''unnamed_',datestr(datetime('now'),'mm/dd/HH_MM'),'''');
execute(conn,query);
r = exec(conn,'SELECT @@IDENTITY');
r = fetch(r);
query = strcat('update tasks set model =',int2str(r.Data{1}),' where id =',int2str(task.id));
exec(conn,query);
close(conn);

%cleanup
rmdir(strcat(tempdir,'brainai'), 's')
end

