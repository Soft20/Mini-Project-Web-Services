import fs from 'fs';

function readFavoriteNumber(): number | null {
	const data = fs.readFileSync('src/database/database.json', 'utf8');
	const json = JSON.parse(data);
	return json.number || null;
}

export function getFavoriteNumber(): number {
	const number = readFavoriteNumber();

	if (number) {
		return number;
	} else {
		throw new Error("Can't get non-existing number.");
	}
}

export function createFavoriteNumber(number: number): void {
	if (!readFavoriteNumber()) {
		fs.writeFileSync('src/database/database.json', `{ "number": ${number} }`);
	} else {
		throw new Error("Can't create already existing number.");
	}
}

export function updateFavoriteNumber(number: number): void {
	if (readFavoriteNumber()) {
		fs.writeFileSync('src/database/database.json', `{ "number": ${number} }`);
	} else {
		throw new Error("Can't update non-existing number.");
	}
}

export function deleteFavoriteNumber(): void {
	if (readFavoriteNumber()) {
		fs.writeFileSync('src/database/database.json', '{}');
	} else {
		throw new Error("Can't delete non-existing number.");
	}
}
