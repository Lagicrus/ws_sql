create database if not exists ws_sql;

create table if not exists ws_sql.Car (
  id int primary key auto_increment,
  reg varchar(12),
  make varchar(250),
  model varchar(250),
  car_year YEAR(4),
  price varchar(10)
);
