worker_id=1;
while(true)
    conn = dbconn();
    query = strcat('update brain.tasks set status=''inProgress'', worker=',int2str(worker_id),' where status =''pending'' and worker = -1 limit 1;');
    execute(conn,query)
    query = strcat('SELECT tasks.id, tasks.owner, tasks.type, tasks.status, tasks.data, tasks.model, tasks.worker, data.location as "dataLocation", models.location as "modelLocation" FROM brain.tasks LEFT JOIN brain.data ON tasks.data = data.id LEFT JOIN brain.models ON tasks.model = models.id where worker = ',int2str(worker_id),' and status = ''inProgress'' limit 1;');
    task = fetch(conn,query);
    close(conn)
    
    num_rows = size(task,1);
    if(num_rows==0)
        pause(5);
        continue;
    end
    
    
    % a static dispatch and run
    if (strcmp( task.type,'preview'))
        gen_preview(task);
    elseif (strcmp( task.type,'prediction'))
        run_prediction(task);
    elseif (strcmp( task.type,'training'))
        train_model(task);
    end
    
    conn = dbconn();
    query = strcat('update brain.tasks set status=''success'' where status =''inProgress'' and worker = ',int2str(worker_id),' limit 1;');
    execute(conn,query)
    close(conn)    
end