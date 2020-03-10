CREATE DATABASE brain;
create table if not exists users
(
    id       int auto_increment
        primary key,
    email    char(64) null,
    password char(64) null,
    constraint users_email_uindex
        unique (email)
);

create table if not exists data
(
    id       int auto_increment
        primary key,
    owner    int                                not null,
    type     enum ('training', 'prediction')    null,
    location varchar(512)                       null comment 'path in cloud storage',
    preview  text                               null,
    name     varchar(64) default 'unnamed data' null,
    constraint data_users_id_fk
        foreign key (owner) references users (id)
            on update cascade on delete cascade
);

create table if not exists models
(
    id       int auto_increment
        primary key,
    owner    int                                 null,
    shared   tinyint(1)  default 0               null,
    location varchar(256)                        null comment 'location in cloud storage',
    metadata text                                null,
    name     varchar(64) default 'unnamed model' null,
    constraint models_users_id_fk
        foreign key (owner) references users (id)
            on update cascade on delete cascade
);

create table if not exists sessions
(
    user_id       int                  not null,
    session_token char(64)             not null
        primary key,
    valid         tinyint(1) default 1 null,
    constraint sessions_users_id_fk
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

create table if not exists tasks
(
    id         int auto_increment
        primary key,
    owner      int                                                                              null,
    type       enum ('training', 'prediction', 'preview')                                       not null,
    status     enum ('pending', 'inProgress', 'success', 'failed', 'stopped') default 'pending' not null,
    data       int                                                                              null,
    model      int                                                                              null comment 'note that for training,model should be invalid by default',
    worker     tinyint                                                        default -1        null,
    percentage tinyint                                                        default 0         null,
    constraint tasks_data_id_fk
        foreign key (data) references data (id)
            on update cascade on delete cascade,
    constraint tasks_models_id_fk
        foreign key (model) references models (id)
            on update cascade on delete cascade,
    constraint tasks_users_id_fk
        foreign key (owner) references users (id)
            on update cascade on delete cascade
);

create index tasks_status_index
    on tasks (status);

create index tasks_worker_index
    on tasks (worker);
