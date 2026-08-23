const { JSDOM } = require("jsdom")

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`)
    const resp = await fetch(currentURL)
    let htmlBody = await resp.text()
    console.log(urlsFromHTML(htmlBody, currentURL))
}

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






module.exports = { normalizeURL,urlsFromHTML,crawlPage}