const express = require("express");
const cors = require("cors");
const app = express();
const crawl = require("./routes/crawl");
const port = process.env.PORT || 9001;

app.use(
    cors({
        credentials: true,
        origin: [`${ process.env.REACT_URL }`],
    }),
);
app.use("/crawl", crawl);

app.listen(port, () => {
    console.log(`Example app listening on url "http://localhost:${ port }"`);
});
