// based off of http://stackoverflow.com/a/10372280/938089
function webwork(callback) {
    // URL.createObjectURL
    window.URL = window.URL || window.webkitURL;
    
    var response = "onmessage=function(event){postMessage(" + callback + "(event.data));}";
    
    var blob;
    try {
        blob = new Blob([response], {type: 'application/javascript'});
    } catch (e) { // Backwards-compatibility
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(response);
        blob = blob.getBlob();
    }

    return function() {
        var worker = new Worker(URL.createObjectURL(blob));
        var args = Array.prototype.slice.call(arguments);
        var callback;
        var ran;
        if (typeof args[args.length - 1] === 'function') {
            callback = args.pop();
        } else {
            callback = function() {};
        }
    
        worker.onmessage = function(e) {
            if (ran) { return; }
            ran = true;
            callback(null, e.data);
        };
        worker.onerror = function(e) {
            if (ran) { return; }
            ran = true;
               
            callback(e);
            return false;
        };
        worker.postMessage.apply(worker, args);
    }
}
