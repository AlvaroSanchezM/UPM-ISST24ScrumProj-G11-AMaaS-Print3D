drop table IF EXISTS users;
drop table IF exists authorities;

create table users(
    usuario varchar_ignorecase(50) not null primary key,
    clave varchar_ignorecase(200) not null,
    permiso varchar_ignorecase(50) not null
);