Data tool to compare the US MSRP of Japanese fishing reels to JDM reels to find price discrepancies. 

 This program scrapes product data from a US fishing retailer website and a Japanese Ecommerce aggregator website for Japanese fishing reels. It then compares the datasets between the two, and with a translation key matches equivilent models from the two websites. It then displays the price discrepency between the two equivilent models and links to the Japanese product page. 
 
 This data is outputted in the form of an easy to read CSV file as shown here:
![](https://user-images.githubusercontent.com/104689110/209743562-c83e7fe0-7ab4-4b0d-92d5-2eb3dca6706e.png)


Uses playwright to scrape website data. 

Current problems to solve:
1. Matching of sub models not implemented (ie Shimano Stradic 4000XG will match with Shimano Stradic 4000HG)
2. A small portion of products with unusually high or low prices or size numbers data do not output accurate data to the final array. (ie Shimano Stella 14000)
3. Products that do not have size numbers will not match. (ie Shimano Ultegra surf)
4. The scraper for kakaku.com(the japanese ecom aggrete site) on rare occasion does not load to the point of scraping being possible, and will not load at all if in headless chromium browser mode. After some investigation this appears to have to do with the websites implementation of lazy-loading the product images. The website also loads quite slow at peak Japanese usage times, which is a possible contributing factor. 


Required packages:

`npm i playwright`

`npm i objects-to-csv`