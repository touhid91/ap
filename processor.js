onmessage = function (event) {
    downloadBuffer(event.data).then(buffer => {
        let data = fromBuffer(buffer)(0, 10)
        console.table(data)
    })

    //noinspection JSUnresolvedFunction
    postMessage('OK')
}

downloadBuffer = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'arraybuffer'

        xhr.onload = () => {
            if (4 == xhr.readyState && 200 === xhr.status)
                return resolve(xhr.response)

            return reject(xhr.status)
        }

        xhr.send()
    })
}

fromBuffer = (buffer) => {
    return (start, end) => {
        let byteArray = new Uint8Array(end - start)
        let index = -1

        while (++index <= byteArray.length) {
            byteArray.push(buffer[index])
        }

        return byteArray
    }
}