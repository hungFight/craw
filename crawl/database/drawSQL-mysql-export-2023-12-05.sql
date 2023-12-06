CREATE TABLE `league`(
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `night_wolf` VARCHAR(200) NOT NULL,
    `bia_sao_vang` VARCHAR(200) NOT NULL,
    `casper` VARCHAR(200) NOT NULL,
     PRIMARY KEY (id)
);


CREATE TABLE `match_of_league`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `league_id` BIGINT,
    `title` VARCHAR(200) NOT NULL,
    `time` VARCHAR(200) NOT NULL,
    `hour` VARCHAR(200) NOT NULL,
    `ordinal_number` BIGINT NOT NULL,
    `place` VARCHAR(200) NOT NULL,
    `team1` VARCHAR(200) NOT NULL,
    `team2` VARCHAR(200) NOT NULL,
    `result` VARCHAR(200) NOT NULL,
    `broadcasters` VARCHAR(200) NOT NULL,
    `audiences` VARCHAR(200) NOT NULL,
     PRIMARY KEY (id)
);

ALTER TABLE match_of_league
ADD FOREIGN KEY (league_id) REFERENCES league(id);



