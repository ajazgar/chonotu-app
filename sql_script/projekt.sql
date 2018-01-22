
DROP TABLE IF EXISTS `ticket`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `user`;


CREATE TABLE `user` (
  `login` varchar(50) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `email` varchar(30) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `user` VALUES ('Admin','password','admin@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('AndrzejTomczynski','password','atomczynski@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('AleksanderNowak','password','anowak@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('RafalPolak','password','rpolak@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('TytusFigiel','password','tfigiel@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('AleksandraNowak','password','aleksandranowak@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('AnnaKowalska','password','akowalska@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('JanLinus','password','jlinus@gmail.com', '2018-01-01');
INSERT INTO `user` VALUES ('MieczyslawMietkowski','password','mmietkowski@gmail.com', '2018-01-01');


CREATE TABLE `event` (
  `eventname` VARCHAR(70) NOT NULL,
  `place` VARCHAR(100) NOT NULL,
  `event_date` DATE NOT NULL,
  `event_time` TIME NOT NULL,
  `how_many_tickets` MEDIUMINT NOT NULL,
  `ticket_price` MEDIUMINT NOT NULL,
  `category` VARCHAR(50),
  PRIMARY KEY (`eventname`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `event` VALUES 
('Morderstwo', 'multikinoKrakow', '2018-02-12', '16:00:00', 100, 10, 'CINEMA'),
('Thor:Ragnarok', 'multikinoKrakow', '2018-02-07', '20:00:00', 30, 15, 'CINEMA'),
('Pierwsza Gwiazdka', 'cinemacityKrakow', '2018-01-29', '12:00:00', 47, 14, 'CINEMA'),
('Mayday 2', 'bagatelaKrakow', '2018-03-11', '21:30:00', 200, 45, 'THEATRE'),
('Szalone Nozyczki', 'bagatelaKrakow', '2018-02-17', '21:00:00', 124, 50, 'THEATRE'),
('Czarnoksieznik z Krainy OZ', 'slowackiKrakow', '2018-02-10', '19:30:00', 84, 40, 'THEATRE'),
('Pinokio', 'slowackiKrakow', '2018-01-27', '18:00:00', 84, 35, 'THEATRE'),
('Krakow Live Festival', 'livefestivalKrakow', '2018-08-20', '17:00:00', 300, 200, 'CONCERT'),
('Opener', 'opener', '2018-06-23','15:00:00', 500, 400, 'CONCERT');


CREATE TABLE `ticket` (
  `id` MEDIUMINT NOT NULL AUTO_INCREMENT, 
  `login` varchar(50) NOT NULL,
  `eventname` varchar(70) NOT NULL,
  `how_many_tickets` MEDIUMINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`login`) REFERENCES user (`login`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(`eventname`) REFERENCES EVENT (`eventname`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

INSERT INTO `ticket`(login,eventname, how_many_tickets) VALUES 
('AndrzejTomczynski','Morderstwo', 2),
('JanLinus','Pinokio', 3),
('JanLinus','Mayday 2', 1),
('AleksandraNowak','Opener', 10),
('RafalPolak','Opener', 2),
('TytusFigiel','Opener', 4);
