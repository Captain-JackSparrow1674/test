const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

app.use(express.json());

app.get("/", (req, res) => {
  const file = path.join(publicDir, "index.html");

  if (!fs.existsSync(file)) {
    return res.status(404).send("index.html not found in public folder");
  }

  res.sendFile(file);
});

app.get("/about", (req, res) => {
  const file = path.join(publicDir, "about.html");

  if (!fs.existsSync(file)) {
    return res.status(404).send("about.html not found in public folder");
  }

  res.sendFile(file);
});

app.get("/api/home", (req, res) => {
  res.json({
    title: "Welcome Home",
    message: "Welcome to our website!",
  });
});

app.get("/api/about", (req, res) => {
  res.json({
    title: "About Us",
    message: "Learn more about our website.",
  });
});

app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving HTML files from: ${publicDir}`);
});
