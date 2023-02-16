const {normalizedUrl, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizedUrl strip protocol', () =>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizedUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizedUrl strip trailing slash', () =>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizedUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizedUrl capitals', () =>{
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizedUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizedUrl without the s', () =>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizedUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML relative', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML both', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path one 
            </a>
            <a href="/path2/">
                Boot.dev Blog path two
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected) 
})

test('getURLsFromHTML relative', () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected) 
})