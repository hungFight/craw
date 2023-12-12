const express = require("express");
const router = express.Router();
const pool = require("../database/dbConnect");
const { v4: uuidv4 } = require("uuid");
const scrape = require("../controller/scrape");

// Scraping data from NightWolf
router.post("/nightWolf", async (req, res) => {
  let i = 0;
  try {
    const crawl = await scrape(
      process.env.CRAWURLNIGHTWOLF,
      "Night Wolf 2023/24",
      i,
    );

    const sqlDelete = "DELETE FROM `match_of_league` WHERE league_id = 1";

    await queryAsync(sqlDelete);

    for (const matchday of crawl.data.matchdays) {
      for (const match of matchday.matches) {
        for (const dataMatch of match.dataMatches) {
          const uuid = uuidv4();
          const sqlInsert =
            "INSERT INTO `match_of_league` (`id`,`league_id`,`index` ,`title`,`date` ,`hour`, `ordinal_number`, `venue`, `home`, `away`, `score`, `channel`, `audience`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

          await queryAsync(sqlInsert, [
            uuid,
            1,
            matchday.index,
            matchday.name,
            match.dateMatch,
            dataMatch.hours,
            dataMatch.maTran,
            dataMatch.venue,
            dataMatch.home,
            dataMatch.away,
            dataMatch.score,
            dataMatch.channel,
            dataMatch.audience,
          ]);
        }
      }
    }

    return res
      .status(200)
      .send({ message: "Insert data to database success", data: crawl });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
});

// Scraping data from Bia sao vang
router.post("/biaSaoVang", async (req, res) => {
  try {
    const crawl = await scrape(
      process.env.CRAWURLBIASAOVANG,
      "Hạng Nhất Quốc Gia Bia Sao Vàng 2023/24",
    );
    const sqlInsert =
      "INSERT INTO `match_of_league` (`id`,`league_id`, `index`, `title`,`date` ,`hour`, `ordinal_number`, `venue`, `home`, `away`, `score`, `channel`, `audience`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const sqlDelete = "DELETE FROM `match_of_league` WHERE league_id = 2";

    await queryAsync(sqlDelete);

    for (const matchday of crawl.data.matchdays) {
      for (const match of matchday.matches) {
        for (const dataMatch of match.dataMatches) {
          const uuid = uuidv4();

          await queryAsync(sqlInsert, [
            uuid,
            2,
            matchday.index,
            matchday.name,
            match.dateMatch,
            dataMatch.hours,
            dataMatch.maTran,
            dataMatch.venue,
            dataMatch.home,
            dataMatch.away,
            dataMatch.score,
            dataMatch.channel,
            dataMatch.audience,
          ]);
        }
      }
    }

    return res.status(200).send(crawl);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

// Scraping data from CASPER
router.post("/casper", async (req, res) => {
  try {
    const crawl = await scrape(
      process.env.CRAWURLCASPER,
      "CÚP QUỐC GIA CASPER 2023/24",
    );
    const sqlInsert =
      "INSERT INTO `match_of_league` (`id`,`league_id`,`index` ,`title`,`date` ,`hour`, `ordinal_number`, `venue`, `home`, `away`, `score`, `channel`, `audience`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const sqlDelete = "DELETE FROM `match_of_league` WHERE league_id = 3";

    await queryAsync(sqlDelete);

    for (const matchday of crawl.data.matchdays) {
      for (const match of matchday.matches) {
        for (const dataMatch of match.dataMatches) {
          const uuid = uuidv4();

          await queryAsync(sqlInsert, [
            uuid,
            3,
            matchday.index,
            matchday.name,
            match.dateMatch,
            dataMatch.hours,
            dataMatch.maTran,
            dataMatch.venue,
            dataMatch.home,
            dataMatch.away,
            dataMatch.score,
            dataMatch.channel,
            dataMatch.audience,
          ]);
        }
      }
    }

    return res.status(200).send(crawl);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

// Get data of night wolf league
router.get("/nightWolf", async (req, res) => {
  try {
    const sql = "SELECT * FROM `match_of_league` WHERE league_id = 1";

    const data = await queryAsync(sql);

    if (!data) {
      res.status(404).send({ message: "Not found data" });
    }

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

// Get data of biaSaoVang league
router.get("/biaSaoVang", async (req, res) => {
  try {
    const sql = "SELECT * FROM `match_of_league` WHERE league_id = 2";

    const data = await queryAsync(sql);

    if (!data) {
      res.status(404).send({ message: "Not found data" });
    }

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

// Get data of casper league
router.get("/casper", async (req, res) => {
  try {
    const sql = "SELECT * FROM `match_of_league` WHERE league_id = 3";

    const data = await queryAsync(sql);

    if (!data) {
      res.status(404).send({ message: "Not found data" });
    }

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", e });
  }
});

// Hàm thực hiện truy vấn với async/await
const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.error("SQL Error:", err); // In thông báo lỗi SQL
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = router;
