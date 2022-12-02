const mainKakaku = require('./kScraper');
const mainTd = require('./tdScraper');

(async() => {


await mainKakaku.mainKakaku();
const td = await mainTd.mainTd();
console.log(td);





})();