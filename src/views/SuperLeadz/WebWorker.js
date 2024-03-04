// export default class WebWorker {
//     // eslint-disable-line no-restricted-globals
//     constructor(worker) {
//         const code = worker.toString()
//         const blob = new Blob(['(' + code + ')()'])
//         return new Worker(URL.createObjectURL(blob))
//     }
// }

export default class WebWorker {
    // eslint-disable-line no-restricted-globals
    constructor(worker) {
        const code = worker.toString()
        const blob = new Blob([`(${code})()`])
        return new Worker(URL.createObjectURL(blob))
    }
}
