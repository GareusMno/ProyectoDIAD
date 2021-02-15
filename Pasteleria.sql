drop database if exists pasteleria;
create database pasteleria;
use pasteleria;

CREATE TABLE Ingredientes (
  idIngrediente (11) NOT NULL auto_increment primary key,
  nom varchar(255) NOT NULL,
  cantidad int(5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Cantidad = kilos
INSERT INTO Ingredientes (nom, cantidad) VALUES
('Leche', '6'),
('Azucar', '8'),
('Chocolate', '6'),
('Harina', '12'),
('Huevos', '8'),
('Queso', '9'),
('Galleta','5');

CREATE TABLE Recetas (
  idReceta int(11) NOT NULL auto_increment primary key,
  nom varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Recetas (nom) VALUES
('Pastel de chocolate'),
('Tarta de queso'),
('Bizcocho'),
('Bizcocho de chocolate');

CREATE TABLE IngredientesReceta(
	idIngrediente bool NOT NULL,
    idReceta int(11) NOT NULL,
    FOREIGN KEY (idIngrediente) REFERENCES Ingredientes(IdIngrediente) on update cascade on delete cascade,
    FOREIGN KEY (idReceta) REFERENCES Recetas(idReceta) on update cascade on delete cascade,
    primary key (idIngrediente,idReceta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO IngredientesReceta (idIngrediente,idReceta) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(1,2),
(2,2),
(5,2),
(6,2),
(7,2),
(2,3),
(4,3),
(5,3),
(2,4),
(3,4),
(4,4),
(5,4);

CREATE TABLE Pasteles (
  idPastel int(11) NOT NULL auto_increment primary key,
  nom varchar(255) NOT NULL,
  precio int(11) NOT NULL,
  idReceta int(11) NOT NULL,
  usado_en int(11),
  FOREIGN KEY (idReceta) REFERENCES Recetas(idReceta) on update cascade on delete cascade,
  FOREIGN KEY(usado_en) REFERENCES Pasteles(idPastel) on update cascade on delete cascade,
  UNIQUE (idReceta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Pasteles (nom,precio,idReceta) VALUES
('Pastel de chocolate',10,1),
('Tarta de queso',8,2),
('Bizcocho',6,3),
('Bizcocho de chocolate',8,4);
update Pasteles set usado_en=4 where idPastel=3;

CREATE TABLE Clientes (
	idCliente int(11) NOT NULL auto_increment primary key,
    nom varchar(255) NOT NULL,
    DNI varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into Clientes (nom,DNI) VALUES
("Pepe Sanchez", "259183452D"),
("Raul Montero", "129520615E"),
("Alex Recio", "975284123F");

CREATE TABLE Pedidos (
	idPedido int(11) NOT NULL auto_increment primary key,
    cantidad int(3) NOT NULL,
    fecha varchar(255) NOT NULL,
    idCliente int(11) NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente) on update cascade on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into Pedidos (cantidad,fecha,idCliente) VALUES
(2,now(),1),
(3,now(),2),
(2,now(),3);
CREATE TABLE PedidosPasteles (
	idPedido int(11) NOT NULL,
    idPastel int(11) NOT NULL,
	FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) on update cascade on delete cascade, 
    FOREIGN KEY (idPastel) REFERENCES Pasteles(idPastel) on update cascade on delete cascade,
    primary key (idPedido,idPastel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into PedidosPasteles (idPedido,idPastel) VALUES
(1,2),
(1,1),
(2,1),
(2,3),
(2,4),
(3,1),
(3,2);