function [] = gen_preview(task)
    dataType = 'prediction';
    mkdir (strcat(tempdir,'brainai'));
    mkdir (strcat(tempdir,'brainai\\','unzip'));
    mkdir (strcat(tempdir,'brainai\\unzip\','preview'));
    unzipLocation= (strcat(tempdir,'brainai\\','unzip'));
    unzip(task.location{1},unzipLocation)
    if(~isempty(dir(fullfile(unzipLocation,'ground truth'))))
        dataType='training';
    end
    files = dir(fullfile(unzipLocation,'images','*.nii*'));
    if(isempty(files))
        error('invalid dataset');
    end
    file = files(1).name;
    image_full_file_name = fullfile(unzipLocation,'images',file);
    img = niftiread(image_full_file_name);
    img1 = imwarp(img,niftiinfo(image_full_file_name).Transform);
    imgout=imadjust(squeeze((img1(size(img1,1)/2,:,:)))/max(img1(:)));
    file= fullfile(strcat(tempdir,'brainai\\unzip\','preview'),'out.jpg');
    imwrite(imgout,file);
    fid = fopen(file,'rb');
    bytes = fread(fid);
    fclose(fid);
    encoder = org.apache.commons.codec.binary.Base64;
    base64string = char(encoder.encode(bytes))';
    conn = dbconn();
    query = strcat(['update data set type = ''',dataType,''', preview = ','''',base64string,'''',' where id =',int2str(task.data), ';']);
    execute(conn,query);
    close(conn);
    rmdir(strcat(tempdir,'brainai'), 's')
end