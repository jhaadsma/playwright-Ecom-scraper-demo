const mainKakaku = require('./scrapers/kScraper.js');
const mainTd = require('./scrapers/tdScraper.js');
const parseCSV = require('./data/csv.js')
const save_to_csv = require('./data/csv.js')
const translate = require('./data/translation.js');

const csvFile = 'translations.csv';



(async () => {

	translationData = [];
	translationData = await parseCSV.parseCSV(csvFile);

	const kakaku = await mainKakaku.mainKakaku();

	const tackleDirect = await mainTd.mainTd();

	const translateData = await translate.translate(translationData, tackleDirect, kakaku);
	

	console.log(translateData);
	save_to_csv.save_to_csv(translateData);

})();

