const puppeteer = require("puppeteer");

const scrape = async (url, league, i) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.goto(url);
  await page.waitForSelector(".jstable");

  const data = await page.evaluate((i) => {
    // let i = 0;
    const table = document.querySelector(".jstable");
    const matchdayElements = table.querySelectorAll(".jstable-row.js-mdname");
    const dataContent = {
      matchdays: [],
    };

    matchdayElements.forEach((matchdayElement) => {
      const matchdayName = matchdayElement
        .querySelector(".jsrow-matchday-name")
        .textContent.trim();

      let matchday = {
        index: 0,
        name: matchdayName,
        matches: [],
      };

      let matchWrapperElement = matchdayElement.nextElementSibling;

      while (matchWrapperElement) {
        if (
          matchWrapperElement.classList.contains("jstable-row") &&
          matchWrapperElement.classList.contains("js-mdname")
        ) {
          break;
        }

        const matchElementsTitle = matchWrapperElement.querySelectorAll(
          ".js-matchday-col.js-matchday-title",
        );

        const matchdayMatchesElements = matchWrapperElement.querySelectorAll(
          ".js-matchday-col.js-matchday-matches",
        );

        matchElementsTitle.forEach((matchElement, index1) => {
          matchdayMatchesElements.forEach((matchdayMatchesElement, index2) => {
            if (matchdayMatchesElement[index2] === matchElement[index1]) {
              const matchDate = matchElement
                .querySelector(".js-matchday-date")
                .textContent.trim();

              const dataMatches = [];

              const jsTableRows =
                matchdayMatchesElement.querySelectorAll(".jstable-row");
              jsTableRows.forEach((jsTableRow) => {
                const hours = jsTableRow.querySelector(
                  ".jstable-cell.jsMatchDivTime .jsDivLineEmbl",
                ).textContent;
                const jsMaTran = jsTableRow
                  .querySelector(".jstable-cell.js-ma-tran .jsDivLineEmbl")
                  .textContent.trim();
                const jsMatchDivVenue = jsTableRow
                  .querySelector(".jstable-cell.jsMatchDivVenue")
                  .textContent.trim();
                const jsMatchDivHome = jsTableRow
                  .querySelector(
                    ".jstable-cell.jsMatchDivHome .jsDivLineEmbl  .js_div_particName a",
                  )
                  .textContent.trim();
                const jsMatchDivScore = jsTableRow
                  .querySelector(".jstable-cell.jsMatchDivScore .jsScoreDiv a")
                  .textContent.trim();
                const jsMatchDivAway = jsTableRow
                  .querySelector(
                    ".jstable-cell.jsMatchDivAway .jsDivLineEmbl  .js_div_particName a",
                  )
                  .textContent.trim();
                const jsChannelDiv = jsTableRow
                  .querySelector(".jstable-cell.jsChannelDiv")
                  .textContent.trim();
                const jsAudience = jsTableRow
                  .querySelector(".jstable-cell.js-audience .jsDivLineEmbl")
                  .textContent.trim();

                const dataMatch = {
                  hours: hours,
                  maTran: jsMaTran,
                  venue: jsMatchDivVenue,
                  home: jsMatchDivHome,
                  score: jsMatchDivScore,
                  away: jsMatchDivAway,
                  channel: jsChannelDiv,
                  audience: jsAudience,
                };

                dataMatches.push(dataMatch);
              });

              const match = {
                dateMatch: matchDate,
                dataMatches,
              };

              matchday.matches.push(match);
              matchWrapperElement = matchWrapperElement.nextElementSibling;
            } else {
              return;
            }
          });
        });
      }
      matchday.index = ++i;
      dataContent.matchdays.push(matchday);
    });

    return dataContent;
  }, i);

  await browser.close();

  return { status: "success", league: league, data: data };
};

module.exports = scrape;
