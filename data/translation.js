
//dotenv For japanese/USD currency conversion API key
require('dotenv').config();
console.log(process.env.API_KEY);
const api_key = process.env.API_KEY;


//The following "translate" function is too large and does too many things at once. I plan on splitting it into multiple functions 
async function translate(translationKey, siteData1, siteData2) {

	const currencyConverter = await currencyConvert();

	const translationData = translationKey;
	const data1 = siteData1;
	const data2 = siteData2;

	finalArray = [];

		for (let i = 0; i < data1.length; i++) {

		const data1Name = data1[i];
		
		let data1ModelNum;

		for (const key in data1Name) {

			//parses digits in model name data, neccesary because products will have multiple sizes denoted by number (ie Shimano Sahara 4000)
			const data1ModelNumArr = key.match(/\d+/g);

			if (data1ModelNumArr && data1ModelNumArr > 0) {
				
				data1ModelNum = data1ModelNumArr[0];
			}

			
			for (let j = 0; j < translationData.length; j++) {
				
				const testTranslation = translationData[j];
				const translationEng = translationData[j].English;
				const translationJpn = translationData[j].Japanese;

				if (key.includes(translationEng)) {

					for (let k = 0; k < data2.length; k++) {

						const data2Name = data2[k].name;
						const data2Price = data2[k].price;

						const data2ModelNum = data2Name.match(/\d+/g);

						const data2ProductLink = data2[k].productLink;

						if (data2ModelNum && data2ModelNum.length > 0) {

							for (let l = 0; l < data2ModelNum.length; l++) {
								
								//A small % of products with unusually large or small numerical values in the product model or price data do not work due to the following matching/conversion implementation. 
								const data2StringNumber = data2ModelNum[l];
								
								if (data2Name.includes(translationJpn) && data2StringNumber == data1ModelNum) {
									
									const dollarToFloat = parseFloat(data1Name[key]);
									const dollarYen = parseFloat(data2Price) * currencyConverter;
									const dollarYenRounded = dollarYen.toFixed(2);
									const convertedYen = Number.parseFloat(dollarYenRounded);
									
									const savingsPercentage = ((dollarToFloat - convertedYen) / dollarToFloat) * 100;
									const savingsPercentageRounded = savingsPercentage.toFixed(2);
									

									console.log('--------\n\nTD: ' + key + '\n\nTranslation: ' + translationEng + '\n\nKakaku: ' + data2Name + '\n\n--------\n\n');

									//push relevant data into array
									finalArray.push({
										ModelName: key,
										TranslationKey: translationEng,
										JapaneseModelName: data2Name,
										USPrice: data1Name[key],
										JapanesePriceYen: data2Price,
										JapanesePriceUSD: convertedYen,
										JapanDiscountPercent: savingsPercentageRounded,
										JapanLink: data2ProductLink
									});





								}


							}
						}

					}
				}

			}


		}
	}

	return finalArray;

	}


exports.translate = translate;


//Live currency exchange rate provided by third-party API. 
async function currencyConvert() {
	const apiKey = api_key;
	const url = 'https://api.getgeoapi.com/v2/currency/convert?api_key=' + apiKey + '&&from=JPY&to=USD&amount=100&format=json';
	const response = await fetch(url);
	const data = await response.json();
	return parseFloat(data.rates.USD.rate);
}






