DROP DATABASE IF EXISTS burgers_DB;
CREATE DATABASE burgers_DB;
USE burgers_DB;

CREATE TABLE burgers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(100) NOT NULL,
  devoured BOOLEAN,
  PRIMARY KEY (id)
);

INSERT INTO burgers (burger_name, devoured) 
VALUES 
("Black Bean Burger", false),
("Portobello Mushroom Burger", true),
("Sloppy Joe", false);

SELECT * FROM burgers;