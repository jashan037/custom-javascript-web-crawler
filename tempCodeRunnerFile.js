if (url.startsWith('/')) {
            let url = `${baseURL}${url}`
            urls.push(url)
        } else {
            urls.push(url)
        }