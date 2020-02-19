oldpath = path;
path(oldpath,fullfile(pwd,'..\\'));
conn = dbconn();
query = 'delete from users where id = 12345';
execute(conn,query);
%% Test valid value
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = 'insert into tasks set id=12345, owner = 12345 , type = ''prediction''';
execute(conn,query);
set_percentage(25,12345);
query = 'select * from tasks where id=12345';
task = fetch(conn,query);
assert(size(task,1)==1);
assert(task.percentage==25);
query = 'delete from users where id = 12345';
execute(conn,query);

%% Test invalid value
query = 'insert into users set id = 12345 , email = ''test_user_12345''';
execute(conn,query);
query = 'insert into tasks set id=12345, owner = 12345 , type = ''prediction''';
execute(conn,query);
set_percentage(125,12345);
query = 'select * from tasks where id=12345';
task = fetch(conn,query);
assert(size(task,1)==1);
assert(task.percentage==100);

set_percentage(-100,12345);
query = 'select * from tasks where id=12345';
task = fetch(conn,query);
assert(size(task,1)==1);
assert(task.percentage==0);


query = 'delete from users where id = 12345';
execute(conn,query);