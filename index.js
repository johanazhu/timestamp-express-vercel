const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", function (req, res) {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  if (/\d{5,}/.test(date)) {
    const dateInt = parseInt(date);
    if (new Date(dateInt).toString() !== "Invalid Date") {
      res.json({
        unix: new Date(dateInt).getTime(),
        utc: new Date(dateInt).toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const dateNum = new Date(date);
    if (new Date(dateNum).toString() !== "Invalid Date") {
      res.json({
        unix: new Date(dateNum).getTime(),
        utc: new Date(dateNum).toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});

app.get("/api/hello", function (req, res) {
  res.json({ data: "hello API" });
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
