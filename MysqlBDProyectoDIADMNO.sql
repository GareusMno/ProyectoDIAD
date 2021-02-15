drop database if exists ITACA;
create database ITACA;
use ITACA;
create table usuario(
    ID_usuario int(10) auto_increment primary key, 
    password varchar(20) not null,
    nom_complet varchar(55) not null,
    image blob) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into usuario(password,nom_complet) values("pepe1234", "Pepe Garcia");
insert into usuario(password,nom_complet) values("pepe1224", "Pepe V");
insert into usuario(password,nom_complet) values("pepe1224", "Pepa V");

create table professors(
    ID_professor int(10) primary key,
    departamento varchar(30) not null,
    FOREIGN KEY (ID_professor) REFERENCES usuario(ID_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into professors(ID_professor,departamento) values(1, "Informatica");
insert into professors(ID_professor,departamento) values(3, "Informatica");
create table alumnes(
    ID_alumne int(10) primary key,
    curso varchar(10) not null,
    repetidor bool not null,
    FOREIGN KEY (ID_alumne) REFERENCES usuario(ID_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into alumnes(ID_alumne,curso,repetidor) values(2, "DAM",true);
create table asignatures(
    ID_assignatura int(10) auto_increment primary key,
    nom_curt varchar(3) not null,
    nom_complet varchar(25) not null,
    hores_semanals int(3),
    modul varchar(10),
    curs int(2)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into asignatures(nom_curt,nom_complet) values("PSP","Pmultasd");
insert into asignatures(nom_curt,nom_complet) values("ASP","PmASDasd");
create table docencia(
    ID_assignatura int(10),
    ID_professor int(10),
    ID_alumne int(10),
    nota int(3),
    FOREIGN KEY (ID_assignatura) REFERENCES asignatures(ID_assignatura),
    FOREIGN KEY (ID_professor) REFERENCES professors(ID_professor),
    FOREIGN KEY (ID_alumne) REFERENCES alumnes(ID_alumne)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into docencia(ID_assignatura,ID_professor,ID_alumne) values(1,1,2);
insert into docencia(ID_assignatura,ID_professor,ID_alumne) values(1,3,2);
select * from docencia;
create table missatgeria(
    ID_mensaje int(10) auto_increment primary key,
    ID_alumne int(10) not null,
    ID_professor int(10) not null,
    missatge varchar(255) not null,
    imatge varchar(255)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;