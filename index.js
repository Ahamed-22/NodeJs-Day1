const fs = require("node:fs");

function createFile() {
  const newDateTime = new Date();
  const month = String(newDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(newDateTime.getDate()).padStart(2, "0");
  const hours = String(newDateTime.getHours()).padStart(2, "0");
  const minutes = String(newDateTime.getMinutes()).padStart(2, "0");

  const fileName = `${day}-${month}-${hours}-${minutes}.txt`;

  //  Write a new files
  fs.writeFile(`./files/${fileName}`, `${newDateTime}`, (err) => {
    if (err) console.log("show error", err);
    else console.log("Success!");
  });
}
// createFile();

// read all files in the folder

function readAllFils() {
  fs.readdir("./files", (err, files) => {
    if (err) console.log("show error", err);
    else console.log("Success!", files);
  });
}
readAllFils();