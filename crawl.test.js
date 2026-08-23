const { normalizeURL,urlsFromHTML } = module.require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL extraction', () => {
    let input = 'https://boot.dev/path/' 
    let output = normalizeURL(input)
    let expected = 'boot.dev/path'
    expect(output).toEqual(expected)
})

test('normalizeURL capital letters', () => {
    let input = 'https://Boot.dev/path/'
    let output = normalizeURL(input)
    let expected ='boot.dev/path'
    expect(output).toEqual(expected)
})


test('urlsFromHTML extraction', () => {
    let input = `
<html>
    <body>
        <a href="https://blog.boot.dev/">
            Boot.dev BLog
        </a>
    </body>
</html>
    `
    let output = urlsFromHTML(input)
    let expected = ['https://blog.boot.dev/']
    expect(output).toEqual(expected)
})

test('urlsFromHTML relative', () => {
    let input = `
<html>
    <body>
        <a href="/path/">
            Boot.dev BLog
        </a>
    </body>
</html>
    `
    const baseURL= "https://blog.boot.dev"
    let output = urlsFromHTML(input,baseURL)
    let expected = ['https://blog.boot.dev/path/']
    expect(output).toEqual(expected)
})

test('urlsFromHTML relative and absolute', () => {
    let input = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev BLog
        </a>
        <a href="/path2/">
            Boot.dev BLog
        </a>
    </body>
</html>
    `
    const baseURL= "https://blog.boot.dev"
    let output = urlsFromHTML(input,baseURL)
    let expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(output).toEqual(expected)
})

test('urlsFromHTML invalidURLS', () => {
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
    let output = urlsFromHTML(input,baseURL)
    let expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(output).toEqual(expected)
})
// console.log(normalizeURL('https://boot.dev/path/'))