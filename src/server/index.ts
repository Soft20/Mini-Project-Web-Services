import express from "express";

let favoriteNumber: number | null = null;

const app = express();

const PORT: number = 3020;
// const BASE_URL: string = `https://calculator.adamlass.com`;
const BASE_URL: string = `http://localhost:${PORT}`;
const links = [
  `${BASE_URL}/add`,
  `${BASE_URL}/subtract`,
  `${BASE_URL}/multiply`,
  `${BASE_URL}/divide`,
  `${BASE_URL}/favorite`,
];

app.use(express.json());

app.post("/add", (req, res) => {
  const { value_a, value_b } = req.body;
  console.log(`Requested addition for ${value_a} & ${value_b}`);
  res.json({ result: value_a + value_b, links });
});

app.post("/subtract", (req, res) => {
  const { value_a, value_b } = req.body;
  console.log(`Requested subtraction for ${value_a} & ${value_b}`);
  res.json({ result: value_a - value_b, links });
});

app.post("/multiply", (req, res) => {
  const { value_a, value_b } = req.body;
  console.log(`Requested multiplication for ${value_a} & ${value_b}`);
  res.json({ result: value_a * value_b, links });
});

app.post("/divide", (req, res) => {
  const { value_a, value_b } = req.body;
  console.log(`Requested division for ${value_a} & ${value_b}`);
  res.json({ result: value_a / value_b, links });
});

app.get("/favorite", (req, res) => {
  console.log(`Requested favorite number`);
  favoriteNumber === null
    ? res.json({ result: `Number does not exist` })
    : res.json({ result: favoriteNumber });
});

app.post("/favorite", (req, res) => {
  const { value } = req.body;
  console.log(`Requested create favorite number as ${value}`);
  favoriteNumber = value;
  res.json({ result: favoriteNumber, links });
});

app.put("/favorite", (req, res) => {
  const { value } = req.body;
  console.log(
    `Requested edit favorite number from ${favoriteNumber} to ${value}`
  );
  if (favoriteNumber === null) {
    res.json({ result: `Favorite number does not exist` });
  } else {
    favoriteNumber = value;
    res.json({ result: favoriteNumber, links });
  }
});

app.delete("/favorite", (req, res) => {
  console.log(`Requested delete of favorite number ${favoriteNumber}`);
  if (favoriteNumber === null) {
    res.json({ result: `Favorite number does not exist` });
  } else {
    favoriteNumber = null;
    res.json({ result: "Favorite number deleted", links });
  }
});

app.listen(PORT, () => console.log(`server running @ ${BASE_URL}`));
