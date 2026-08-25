function printReport(pages){
    pages = sortPages(pages)
    console.log('==============')
    console.log('=== Report ===')
    console.log('==============')
    for (const page of pages) { 
        console.log(`found ${page[1]} links to page ${page[0]}`)
    }
    console.log('==============')
    console.log('= Report end =')
    console.log('==============')
}


function sortPages(pages) {
    pages = Object.entries(pages)
    return pages.sort((a, b) => b[1] - a[1])
}

module.exports = {sortPages,printReport}