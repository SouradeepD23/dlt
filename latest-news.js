import fetch from 'node-fetch';

const api_url = "https://time.com";
var latestNewsList = [];

/* getTrimmedNews function parses the html content of the url and returns the top 5 'Latest Stories' section in an array */
const getTrimmedNews = (str) => {
    const sectionStart = str.indexOf("<section class=\"homepage-module latest\" data-module_name=\"Latest Stories\">");
    str = str.substring(sectionStart);

    const sectionEnd = str.indexOf("</section>");
    str = str.substring(0, sectionEnd);

    const listPattern = /<h2 class="title"><a href=(.*)<\/a>/g;
    var results = [...str.matchAll(listPattern)];

    return results;
}

/* getLatestNews function returns an array of objects containing the top 5 Latest Stories */
const getLatestNews = (results) => {
    results.forEach((result) => {
        var latestNews = {
            "title":result[1].split("/>")[1],
            "link":api_url + result[1].split("/>")[0]
        }
        latestNewsList.push(latestNews);
    })
    return latestNewsList;
}

const response = await fetch(api_url);
var htmlContent = await response.text();
var trimmedNews = getTrimmedNews(htmlContent);
var latestNewsList = getLatestNews(trimmedNews);

export const data = latestNewsList;
