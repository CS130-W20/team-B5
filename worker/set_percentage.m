function [] = set_percentage(percentage,taskid)

conn = dbconn();
if(percentage > 100)
    percentage = 100;
end
if(percentage < 0)
    percentage = 0;
end
query = strcat('update tasks set percentage = ',int2str(ceil(percentage)),' where id = ',int2str(taskid),';');
execute(conn,query);
close(conn)

end

