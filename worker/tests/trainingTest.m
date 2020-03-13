oldpath = path;
path(oldpath,fullfile(pwd,'..\\'));
conn = dbconn();
query = 'delete from users where id = 12345';
execute(conn,query);

%% Test 1

%setup
dataLocation=strrep(fullfile(pwd,'data','dataset_training.zip'),'\','/');
mkdir(tempdir,'brainaiTest');
copyfile(dataLocation,fullfile(tempdir,'brainaiTest'));
dataLocation=strrep(fullfile(pwd,'data','dataset_training.zip'),'\','/');
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = strcat('insert into data set id=12345, owner = 12345 , location=''',dataLocation,'''');
execute(conn,query);

query = strcat('insert into tasks set id=12345, owner = 12345 , type = ''training'', data=12345');
execute(conn,query);
query = strcat('SELECT tasks.id, tasks.owner, tasks.type, tasks.status, tasks.data, tasks.model, tasks.worker, data.location as "dataLocation", models.location as "modelLocation" FROM brain.tasks LEFT JOIN brain.data ON tasks.data = data.id LEFT JOIN brain.models ON tasks.model = models.id where tasks.id=12345');
task = fetch(conn,query);

% run
train_model(task);

% check
query = strcat('SELECT tasks.id, tasks.percentage, tasks.owner, tasks.type, tasks.status, tasks.data, tasks.model, tasks.worker, data.location as "dataLocation", models.location as "modelLocation" FROM brain.tasks LEFT JOIN brain.data ON tasks.data = data.id LEFT JOIN brain.models ON tasks.model = models.id where tasks.id=12345');
task = fetch(conn,query);
assert(task.percentage==100);

%cleanup 
rmdir(strcat(tempdir,'brainaiTest'), 's')
query = 'delete from users where id = 12345';
execute(conn,query);