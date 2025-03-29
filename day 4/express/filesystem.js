const fs = require("fs").promises;

fs.readFile("hello.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
