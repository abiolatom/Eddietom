const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.get("/api", async (req, res) => {
  res.json({ message: "Hello from api Port!" });
});

app.listen(3001, () => {
  console.log(`Server listening on port ${PORT}`);
});
