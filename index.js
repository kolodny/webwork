// based off of http://stackoverflow.com/a/10372280/938089
const webwork = callback => ((
  postMessageString,
  onMessageString,
  responseString = onMessageString + `=async e=>{try{${postMessageString}({g:await(${callback})(...e.data)})}catch(b){${postMessageString}({b})}}`,
  blob = new Blob([responseString]),
  worker,
) => (...args) => new Promise((resolve, reject, objectURL) => {
  objectURL = URL.createObjectURL(blob);
  worker = new Worker(objectURL);
  URL.revokeObjectURL(objectURL);
  worker[onMessageString] = ({data:d}) => d.g ? resolve(d.g) : reject(d.b);
  worker.onerror = reject;
  worker[postMessageString](args)
}).finally(()=>worker.terminate()))('postMessage', 'onmessage');

if (typeof module === 'object' && module.exports) {
    module.exports = webwork
}