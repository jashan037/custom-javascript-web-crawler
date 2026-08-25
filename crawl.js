const { JSDOM,VirtualConsole } = require("jsdom")

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname)
        return pages

    const normalizedCurrentURL = normalizeURL(currentURL)

    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()

        console.log(`actively crawling:${currentURL}`)

        const nextURLs = urlsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL,nextURL,pages)
        }
    } catch (err) {
        console.log(`error ${err.message} on page ${currentURL}`)
    }
    return pages
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let ret = `${urlObj.hostname}${urlObj.pathname}`
    if (ret.length > 0 && ret.slice(-1) == '/')
        ret = ret.slice(0, ret.length - 1)
    return ret.toLowerCase();
}


function urlsFromHTML(htmlBody, baseURL) {
    let urls = []
    const virtualConsole = new VirtualConsole()
    const dom = new JSDOM(htmlBody, {
        virtualConsole
    })

    const linkElements = dom.window.document.querySelectorAll('a')

    for (const elem of linkElements) {
        let href = elem.getAttribute('href')
        try {
            href = new URL(href,baseURL)
        } catch (err) {
            continue;
        }
        urls.push(href.href)
    }
    return urls
}



module.exports = { normalizeURL,urlsFromHTML,crawlPage}