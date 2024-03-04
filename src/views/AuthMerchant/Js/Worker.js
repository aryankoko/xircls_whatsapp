self.onmessage = function (e) {
    // Do some work with e.data
    const result = e.data + 1
    console.log(result)
    // Post the result back to the main thread
    self.postMessage(result)
}