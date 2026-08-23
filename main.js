const { crawlPage } = require('./crawl.js')

async function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("too many arguments provided")
        process.exit(1)
    }
    const url = process.argv[2]
    await crawlPage(url)
}
main()