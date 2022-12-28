const fs = require('fs');
const { parse } = require('csv-parse');
const ObjectsToCsv = require('objects-to-csv');


function parseCSV(csv) {
	
	data = [];
	
	fs.createReadStream(csv)
		.pipe(
			parse({
				delimiter: ',',
				columns: true,
				ltrim: true,
			})
		)
		.on('data', function (row) {
			data.push(row);
		})
		.on('error', function (error) {
			console.log(error.message);
		})
		.on('end', function () {
			console.log('parsed csv: ');
			console.log(data);
		});

		return data

}

exports.parseCSV = parseCSV;


function save_to_csv(product) {

	const csv = new ObjectsToCsv(product);
	csv.toDisk('test_Csv_for_final.csv');

}

exports.save_to_csv = save_to_csv;