const playwright = require('playwright');
const ObjectsToCsv = require('objects-to-csv');


const urlShimano = 'https://search.kakaku.com/%83V%83%7d%83m%20%83%8a%81%5b%83%8b/?category=0009_0004_0017';
const urlDaiwa = 'https://search.kakaku.com/%83_%83C%83%8f%20%83%8a%81%5b%83%8b/?category=0009_0004_0017';



async function loopKakaku(url)  {
	console.log('\n\nSTART SCRAPING URL:  ' + url +  '\n\n');
	
	
	//Scraper does not work in headless mode since 11/27. Appears to be an issue with the websites implementation of lazy-loading images. 
	const browser = await playwright.chromium.launch({ headless: false, slowMo: 100 });
	
	const page = await browser.newPage();

	await page.goto(url, {timeout: 0});
	
	data = [];
	
	data = data.concat(await scrapeKakaku(page));
	
	await page.waitForSelector('.p-pager_num.p-pager_num_disabled');
	const pageNum = await page.innerText('.p-pager_num.p-pager_num_disabled');
	const pageNumLoop = parseInt(pageNum) - 1;

	console.log('Scraping page: ' + 1 + '/' + pageNum);

	for (let i = 0; i < pageNumLoop; i++) {
		
		console.log('Scraping page: ' + (i + 2) + '/' + pageNum);
		
		await page.locator('li:has-text(">")').click();
		
		data = data.concat(await scrapeKakaku(page));
	};

	await browser.close();
	
	console.log('\n\n\nEND SCRAPING URL:  ' + url);

	return data;
	
};


async function mainKakaku() {

	const arr1 = await loopKakaku(urlShimano);
	const arr2 = await loopKakaku(urlDaiwa);
	console.log('\n\nPAGES COMPLETE');
	combinedArr = [];
	combinedArr = arr1.concat(arr2); 

	
	return combinedArr;
	
};

exports.mainKakaku = mainKakaku;

async function scrapeKakaku(page) {
	
	await page.waitForLoadState('domcontentloaded');
	
	await page.waitForSelector('.c-list1_cell', {
		waitFor: 'visible',
	}); 

	const product = await page.$$eval('.c-list1_cell', all_items => {
		
		const data = [];
		
		all_items.forEach(product => {
			
			const name =  product.querySelector('.p-item_name').innerText;
			
			const priceRaw = product.querySelector('.c-num.p-item_price_num').innerText;
			const priceYen = priceRaw.replace('¥', '')
			const priceDot = priceYen.replace('～', '');
			const price  = priceDot.replace(',', '');
			
			const productLink = product.querySelector('.p-item_visual').getAttribute('href');
			
			data.push({name, price, productLink});
	
		});
	
		return data;

	});
	
	return product;
	

}


