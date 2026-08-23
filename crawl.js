const { JSDOM } = require("jsdom")

function normalizeURL(url) {
    const urlObj = new URL(url)
    let ret = `${urlObj.hostname}${urlObj.pathname}`
    if (ret.length > 0 && ret.slice(-1) == '/')
        ret = ret.slice(0, ret.length - 1)
    return ret.toLowerCase();
}


function urlsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)

    const linkElements = dom.window.document.querySelectorAll('a')

    for (const elem of linkElements) {
        let href = elem.getAttribute('href')
        if (href.startsWith('/')) {
            href = `${baseURL}${href}`
        }
        try {
            let test = new URL(href)
        } catch (err) { 
            continue;
        }
        urls.push(href)
    }

    return urls
}

let input = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev BLog
        </a>
        <a href="invalid">
            Boot.dev BLog
        </a>
        <a href="/path2/">
            Boot.dev BLog
        </a>
    </body>
</html>
    `
const baseURL= "https://blog.boot.dev"


console.log(urlsFromHTML(input,baseURL))





module.exports = { normalizeURL,urlsFromHTML}