const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

router.get("/", async (req, res) => {
  const scrape = await scraper();

  res.status(200).send(scrape);
});

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.CRAWURL);

  await page.waitForSelector(".table-striped");

  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll(".table-striped tbody tr");
    const rowData = [];

    rows.forEach((row) => {
      const columns = row.querySelectorAll("td");
      const rowsObject = {
        VT: columns[0].textContent.trim(),
        DoiBong: columns[1].textContent.trim(),
        Tran: columns[2].textContent.trim(),
        T: columns[3].textContent.trim(),
        H: columns[4].textContent.trim(),
        B: columns[5].textContent.trim(),
        BTBB: columns[6].textContent.trim(),
        HS: columns[7].textContent.trim(),
        BTSK: columns[8].textContent.trim(),
        TV: columns[9].textContent.trim(),
        TD: columns[10].textContent.trim(),
        Diem: columns[11].textContent.trim(),
      };

      rowData.push(rowsObject);
    });

    return rowData;
  });

  await browser.close();

  return { status: "success", data: data };
};

module.exports = router;
