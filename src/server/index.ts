import express from 'express';
import * as database from './database';

const app = express();

const PORT: number = 3020;
// const BASE_URL: string = `https://calculator.adamlass.com`;
const BASE_URL: string = `http://localhost:${PORT}`;
// const _links = [`${BASE_URL}/add`, `${BASE_URL}/subtract`, `${BASE_URL}/multiply`, `${BASE_URL}/divide`, `${BASE_URL}/favorite`];

const _links: Object = {
	favorite: [
		{ href: '/favorite', rel: 'Get favorite number', method: 'GET' },
		{ href: '/favorite', rel: 'Create favorite number', method: 'POST' },
		{ href: '/favorite', rel: 'Update favorite number', method: 'PUT' },
		{ href: '/favorite', rel: 'Delete favorite number', method: 'DELETE' },
	],

	calculator: [
		{ href: '/add', rel: 'Number addition', method: 'POST' },
		{ href: '/subtract', rel: 'Number subtraction', method: 'POST' },
		{ href: '/multiply', rel: 'Number multiplication', method: 'POST' },
		{ href: '/divide', rel: 'Number division', method: 'POST' },
	],
};

app.use(express.json());

app.post('/add', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested addition for ${value_a} & ${value_b}`);
	res.json({ result: value_a + value_b, _links });
});

app.post('/subtract', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested subtraction for ${value_a} & ${value_b}`);
	res.json({ result: value_a - value_b, _links });
});

app.post('/multiply', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested multiplication for ${value_a} & ${value_b}`);
	res.json({ result: value_a * value_b, _links });
});

app.post('/divide', (req, res) => {
	const { value_a, value_b } = req.body;
	console.log(`Requested division for ${value_a} & ${value_b}`);
	res.json({ result: value_a / value_b, _links });
});

app.get('/favorite', (req, res) => {
	console.log(`Requested favorite number`);

	try {
		const favoriteNumber: number = database.getFavoriteNumber();
		res.json({ result: favoriteNumber, _links });
	} catch (error) {
		res.status(404).json({ result: error.message, _links });
	}
});

app.post('/favorite', (req, res) => {
	const { value } = req.body;
	console.log(`Requested create favorite number as ${value}`);

	try {
		database.createFavoriteNumber(value);
		res.json({ result: value, _links });
	} catch (error) {
		res.status(403).json({ result: error.message, _links });
	}
});

app.put('/favorite', (req, res) => {
	const { value } = req.body;
	console.log(`Requested edit favorite number to ${value}`);

	try {
		database.updateFavoriteNumber(value);
		res.json({ result: value, _links });
	} catch (error) {
		res.status(404).json({ result: error.message, _links });
	}
});

app.delete('/favorite', (req, res) => {
	console.log(`Requested delete of favorite number`);

	try {
		database.deleteFavoriteNumber();
		res.json({ result: 'Favorite number deleted', _links });
	} catch (error) {
		res.status(404).json({ result: error.message, _links });
	}
});

app.listen(PORT, () => console.log(`server running @ ${BASE_URL}`));
