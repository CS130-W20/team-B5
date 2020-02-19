oldpath = path;
path(oldpath,fullfile(pwd,'..\\'));
conn = dbconn();
query = 'delete from users where id = 12345';
execute(conn,query);

%% Test 1

%setup
modelLocation = strrep(fullfile(pwd,'data','deeplabv3net2.mat'),'\','/');
dataLocation=strrep(fullfile(pwd,'data','dataset_prediction.zip'),'\','/');
mkdir(tempdir,'brainaiTest');
copyfile(dataLocation,fullfile(tempdir,'brainaiTest'));
dataLocation=strrep(fullfile(pwd,'data','dataset_prediction.zip'),'\','/');
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = strcat('insert into data set id=12345, owner = 12345 , location=''',dataLocation,'''');
execute(conn,query);
query = strcat('insert into models set id=12345, owner = 12345 , location=''',modelLocation,'''');
execute(conn,query);
query = strcat('insert into tasks set id=12345, owner = 12345 , type = ''prediction'', data=12345, model=12345 ');
execute(conn,query);
query = strcat('SELECT tasks.id, tasks.owner, tasks.type, tasks.status, tasks.data, tasks.model, tasks.worker, data.location as "dataLocation", models.location as "modelLocation" FROM brain.tasks LEFT JOIN brain.data ON tasks.data = data.id LEFT JOIN brain.models ON tasks.model = models.id where tasks.id=12345');
task = fetch(conn,query);

% run
run_prediction(task);

% check
query = strcat('SELECT tasks.id, tasks.percentage, tasks.owner, tasks.type, tasks.status, tasks.data, tasks.model, tasks.worker, data.location as "dataLocation", models.location as "modelLocation" FROM brain.tasks LEFT JOIN brain.data ON tasks.data = data.id LEFT JOIN brain.models ON tasks.model = models.id where tasks.id=12345');
task = fetch(conn,query);
assert(task.percentage==100);

unzip(dataLocation,fullfile(tempdir,'brainaiTest'));
assert(exist(fullfile(tempdir,'brainaiTest','maskOutput'),'dir')==7);
assert(length(dir(fullfile(tempdir,'brainaiTest','maskOutput','*nii*'))) == length(dir(fullfile(tempdir,'brainaiTest','images','*nii*'))))
%cleanup 
rmdir(strcat(tempdir,'brainaiTest'), 's')
query = 'delete from users where id = 12345';
execute(conn,query);