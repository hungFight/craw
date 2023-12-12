CREATE TABLE `league`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` varchar(200),
     PRIMARY KEY (id)
);


CREATE TABLE `match_of_league`(
    `id` varchar(200),
    `league_id` BIGINT,
    `date` varchar(200),
    `index` bigint,
    `title` VARCHAR(200) ,
    `hour` VARCHAR(200) ,
    `ordinal_number` varchar(100),
    `venue` VARCHAR(200) ,
    `home` VARCHAR(200),
    `away` VARCHAR(200) ,
    `score` VARCHAR(200) ,
    `channel` VARCHAR(200) ,
    `audience` VARCHAR(200) ,
     PRIMARY KEY (id)
);

ALTER TABLE match_of_league
ADD FOREIGN KEY (league_id) REFERENCES league(id);

insert into  league (name) values ("night-wolf"), ("bia-sao-vang"), ("casper");



