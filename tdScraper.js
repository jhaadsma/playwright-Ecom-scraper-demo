
const playwright = require('playwright');
const ObjectsToCsv = require('objects-to-csv');

const url = 'https://www.tackledirect.com/reels.html#/filter:manufacturer:Daiwa/filter:manufacturer:Shimano/sort:ga_unique_purchases:desc';

async function mainTd() {

	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();

	productP = [];
	productM = [];

	const reelURL = await scrapeUrl();

	var num = 0;
	while (num < reelURL.length){
		console.log(reelURL[num]);
		await page.goto(reelURL[num]);

		const productModel =  await TD_PP_Scraper_Model(page);
		const productPrice = await TD_PP_Scraper_Price(page);
		productM = productM.concat(productModel);
		productP = productP.concat(productPrice);

		num++;

	};

	const productModelPrice = await new Object();
	for (var i = 0; i < productM.length; i++){

		productModelPrice[productM[i]]=productP[i];

	}; 

 	await browser.close();

	return productModelPrice;
	console.log(productModelPrice);
	save_to_csv(productModelPrice);

};


exports.mainTd = mainTd;


async function TD_PP_Scraper_Model(page) {

	await page.waitForLoadState('domcontentloaded');
	await page.waitForLoadState('networkidle');

	await page.waitForSelector('.mpc-chart-row.mpc-chart-cell-row > .mpc-chart-cell > a', {state: 'hidden'});

	const productModel = await page.$$eval('.mpc-chart-row.mpc-chart-cell-row > .mpc-chart-cell > a', all_items => {
		const data = [];

		all_items.forEach(item => {
	
			const modelUrl = item.getAttribute('href'); 
			const model = modelUrl.replace('.html', '');
			data.push(model);
		
			});
		
		console.log(data);
		return data;

		});  

	return productModel;

	await context.close();
	await browser.close();

};



async function TD_PP_Scraper_Price(page) {
	await page.waitForLoadState('domcontentloaded');
	await page.waitForLoadState('networkidle');
	await page.waitForSelector('.mpc-chart-row.mpc-chart-cell-row.mpc-chart-cell-row-mobile > .mpc-chart-cell > .mpc-price'); 

	const productPrice = await page.$$eval('.mpc-chart-row.mpc-chart-cell-row.mpc-chart-cell-row-mobile > .mpc-chart-cell > .mpc-price', all_items => {
		const data = [];
		all_items.forEach(item => {
		const price = item.innerText;
		data.push(price);
		
			});
	
	console.log(data);
	return data;
	
	});
	
	return productPrice;

	await context.close();
	await browser.close();

}


async function scrapeUrl() {
	const browser = await playwright.chromium.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.nxt-product-item-wrap > a');

	const URLlist = await page.$$eval('.nxt-product-item-wrap > a', all_items => {
		const data = [];
		all_items.forEach(URLlist => {
		
			const href = URLlist.getAttribute('href'); 
			const completeUrl = 'https://www.tackledirect.com/' + href;
		
			data.push(completeUrl);

			});
	
		return data;	
	
		});

	await browser.close();
	return URLlist; 


};


function save_to_csv(product) {
	
	const csv = new ObjectsToCsv(product);
	csv.toDisk('FINAL_US_REEL_DATA.csv');
}