#!/usr/bin/env node

const fs = require("fs");
const { program } = require("commander");

program
  .option("-s, --save <filePath>", "Save file reference to drop somewhere else")
  .option("-d, --drop <newFileName>", "Drop file into current folder")
  .option("-r, --removeSource", "Delete source file (mv operation)");

program.parse(process.argv);

let sourceFilePath = "";

if (program.save) {
  const fileName = program.save;
  const filePath = `${__dirname}/${fileName}`;

  fs.writeFileSync("sourceFilePath.txt", filePath, "utf8", (error, data) => {
    if (error) return console.log(error);
  });
}

if (program.drop) {
  const dropFileName = program.drop;
  sourceFilePath = fs.readFileSync("sourceFilePath.txt", { encoding: "utf8" });

  fs.createReadStream(sourceFilePath).pipe(fs.createWriteStream(dropFileName));
}

if (program.removeSource) {
  fs.unlinkSync(sourceFilePath);
}
