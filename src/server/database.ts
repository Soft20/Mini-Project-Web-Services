import fs from "fs";

fs.readFile("src/database/database.json", (err, data: any) => {
  if (err) throw err;
  let database = JSON.parse(data);
  console.log(database);
});

console.log("This is after the read call");
