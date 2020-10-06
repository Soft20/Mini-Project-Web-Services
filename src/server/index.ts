import express from 'express';

const app = express();

const PORT: number = 3020;
const BASE_URL: string = `https://calculator.adamlass.com`;
const links = [`${BASE_URL}/add`, `${BASE_URL}/subtract`, `${BASE_URL}/multiply`, `${BASE_URL}/divide`];

app.use(express.json());

app.post('/add', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested addition for ${value_a} & ${value_b}`);
	res.json({ result: value_a + value_b, links });
});

app.post('/subtract', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested subtraction for ${value_a} & ${value_b}`);
	res.json({ result: value_a - value_b, links });
});

app.post('/multiply', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested multiplication for ${value_a} & ${value_b}`);
	res.json({ result: value_a * value_b, links });
});

app.post('/divide', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested division for ${value_a} & ${value_b}`);
	res.json({ result: value_a / value_b, links });
});

app.listen(PORT, () => console.log(`server running @ ${BASE_URL}`));
