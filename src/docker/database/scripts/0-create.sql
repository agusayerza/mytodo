create sequence hibernate_sequence start 3 increment 1;
create table todo (id int8 not null, description varchar(255) not null, marked boolean, primary key (id));