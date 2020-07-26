#!/usr/bin/env node

const fs = require("fs");
const { program } = require("commander");

program
  .option("-c, --copy <filePath>", "Copy file")
  .option("-m, --move", "Move file")
  .option("-d, --drop <newFileName>", "Drop file");

program.parse(process.argv);

if (program.copy) {
  const fileName = program.copy;
  const filePath = `${__dirname}/${fileName}`;

  fs.writeFileSync("file.txt", filePath, "utf8", (error, data) => {
    if (error) return console.log(error);
  });
}

if (program.drop) {
  const dropFileName = program.drop;
  const sourceFilePath = fs.readFileSync("file.txt", { encoding: "utf8" });

  fs.createReadStream(sourceFilePath).pipe(fs.createWriteStream(dropFileName));
}
