
DROP TABLE IF EXISTS `TICKET`;
DROP TABLE IF EXISTS `EVENT`;
DROP TABLE IF EXISTS `USER`;


CREATE TABLE `USER` (
  `login` varchar(50) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `email` varchar(30) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `USER` VALUES ('Admin','password','admin@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('AndrzejTomczynski','password','atomczynski@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('AleksanderNowak','password','anowak@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('RafalPolak','password','rpolak@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('TytusFigiel','password','tfigiel@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('AleksandraNowak','password','aleksandranowak@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('AnnaKowalska','password','akowalska@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('JanLinus','password','jlinus@gmail.com', '2018-01-01');
INSERT INTO `USER` VALUES ('MieczyslawMietkowski','password','mmietkowski@gmail.com');



CREATE TABLE `EVENT` (
  `eventname` VARCHAR(70) NOT NULL,
  `place` VARCHAR(100) NOT NULL,
  `event_date` DATE NOT NULL,
  `event_time` TIME NOT NULL,
  `how_many_tickets` MEDIUMINT NOT NULL,
  `ticket_price` MEDIUMINT NOT NULL,
  PRIMARY KEY (`eventname`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `EVENT` VALUES 
('MorderstwoWOrientExpressie', 'multikinoKrakow', '2018-02-12', '16:00:00', 100, 10),
('Thor:Ragnarok', 'multikinoKrakow', '2018-02-07', '20:00:00', 30, 15),
('PierwszaGwiazdka', 'cinemacityKrakow', '2018-01-29', '12:00:00', 47, 14),
('Mayday2', 'bagatelaKrakow', '2018-03-11', '21:30:00', 200, 45),
('SzaloneNozyczki', 'bagatelaKrakow', '2018-02-17', '21:00:00', 124, 50),
('CzarnoksieznikZKrainyOZ', 'slowackiKrakow', '2018-02-10', '19:30:00', 84, 40),
('Pinokio', 'slowackiKrakow', '2018-01-27', '18:00:00', 84, 35),
('KrakowLiveFestival', 'livefestivalKrakow', '2018-08-20', '17:00:00', 300, 200),
('Opener', 'opener', '2018-06-23','15:00:00', 500, 400);



CREATE TABLE `TICKET` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT, 
  `login` varchar(50) NOT NULL,
  `eventname` varchar(70) NOT NULL,
  `how_many_tickets` MEDIUMINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`login`) REFERENCES USER (`login`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(`eventname`) REFERENCES EVENT (`eventname`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `TICKET`(login,eventname, how_many_tickets) VALUES 
('AndrzejTomczynski','MorderstwoWOrientExpressie', 2),
('JanLinus','Pinokio', 3),
('JanLinus','Mayday2', 1),
('AleksandraNowak','Opener', 10),
('RafalPolak','Opener', 2),
('TytusFigiel','Opener', 4);


