import express from 'express';

const app = express();

const PORT: number = 3020;
<<<<<<< HEAD
const BASE_URL: string = `http://localhost:${PORT}`;
const links: string[] = [`${BASE_URL}/add`, `${BASE_URL}/subtract`, `${BASE_URL}/multiply`, `${BASE_URL}/divide`];
=======
const BASE_URL: string = `https://calculator.adamlass.com`;
const links = [`${BASE_URL}/add`, `${BASE_URL}/subtract`, `${BASE_URL}/multiply`, `${BASE_URL}/divide`];
>>>>>>> a5d56183597def912f3e456f4e1efe07b690ad6d

app.use(express.json());

app.post('/add', (req, res) => {
	const { value_a, value_b } = req.body;
	res.json({ result: value_a + value_b, links });
});

app.post('/subtract', (req, res) => {
	const { value_a, value_b } = req.body;
	res.json({ result: value_a - value_b, links });
});

app.post('/multiply', (req, res) => {
	const { value_a, value_b } = req.body;
	res.json({ result: value_a * value_b, links });
});

app.post('/divide', (req, res) => {
	const { value_a, value_b } = req.body;
	res.json({ result: value_a / value_b, links });
});

app.listen(PORT, () => console.log(`server running @ ${BASE_URL}`));
