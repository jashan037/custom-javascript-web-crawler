const { urlsFromHTML } = require('./crawl.js')

const url = 'https://www.apple.com/';
(async () => {
    let resp = await fetch(url);
    resp = await resp.text()
    let res = urlsFromHTML(resp, url)
    console.log(res)
 })()
