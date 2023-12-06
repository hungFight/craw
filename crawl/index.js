const express = require("express");
const app = express();
const crawl = require("./routes/crawl");
const port = process.env.PORT || 9001;

app.use("/crawl", crawl);

app.listen(port, () => {
    console.log(`Example app listening on url "http://localhost:${port}"`);
});
