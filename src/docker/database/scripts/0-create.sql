create sequence hibernate_sequence start 3 increment 1;

create table folder (id int8 not null,
                    name varchar(128) not null,
                    primary key(id));

create table todo (id int8 not null,
                    description varchar(255) not null,
                    marked boolean,
                    folder_id int8 not null,
                    primary key (id),
                    constraint fk_folderId foreign key(folder_id) references folder(id));