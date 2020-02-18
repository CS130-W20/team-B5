function stop = dbStopFunction(info,taskid,maxEpoch)

stop = false;

% Keep track of the best validation accuracy and the number of validations for which
% there has not been an improvement of the accuracy.

% Clear the variables when training starts.s
if(mod(info.Iteration,150)==0)
    conn = dbconn();
    query = strcat('SELECT tasks.id,tasks.owner,tasks.type,tasks.status,tasks.data,tasks.model,tasks.worker,data.location FROM ( brain.tasks INNER JOIN brain.data ON tasks.data = data.id) where tasks.id = ',int2str(taskid),' limit 1;');
    task = fetch(conn,query);
    if (strcmp (task.status{1},'stopped'))
        stop = true;
    end
    
    query = strcat('update tasks set percentage = ',int2str(100*info.Epoch/maxEpoch),' where id = ',int2str(taskid),';');
    execute(conn,query);
    close(conn)
    
end

end