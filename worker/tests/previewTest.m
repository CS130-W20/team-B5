oldpath = path;
path(oldpath,fullfile(pwd,'..\\'));
conn = dbconn();
query = 'delete from users where id = 12345';
execute(conn,query);
%% Test training dataset

%setup
filename = strrep(fullfile(pwd,'data','dataset_training.zip'),'\','/');
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = strcat('insert into data set id=12345, owner = 12345 , location=''',filename,'''');
execute(conn,query);

%pre-condition check
query = 'select * from data where id=12345';
data = fetch(conn,query);
assert(isempty(data.preview{1}));

%mock data
id=12345;owner = 12345;type = {'preview'};status = {'pending'};data=12345;
model=nan;worker=-1;percentage=0;
location={filename};
task = table( id,owner,type,status,data,model,worker,percentage,location);

%run
gen_preview(task)

%check
query = 'select * from data where id=12345';
data = fetch(conn,query);
assert(strcmp(data.type{1},'training'));
assert(~isempty(data.preview{1}));

%cleanup 
query = 'delete from users where id = 12345';
execute(conn,query);
%% Test prediction dataset

%setup
filename = strrep(fullfile(pwd,'data','dataset_prediction.zip'),'\','/');
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = strcat('insert into data set id=12345, owner = 12345 , location=''',filename,'''');
execute(conn,query);

%pre-condition check
query = 'select * from data where id=12345';
data = fetch(conn,query);
assert(isempty(data.preview{1}));

%mock data
id=12345;owner = 12345;type = {'preview'};status = {'pending'};data=12345;
model=nan;worker=-1;percentage=0;
location={filename};
task = table( id,owner,type,status,data,model,worker,percentage,location);

%run
gen_preview(task)

%check
query = 'select * from data where id=12345';
data = fetch(conn,query);
assert(strcmp(data.type{1},'prediction'));
assert(~isempty(data.preview{1}));

%cleanup 
query = 'delete from users where id = 12345';
execute(conn,query);