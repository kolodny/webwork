webwork.js
=======

Execute Web Workers without external files

Usage is as really simple:

```javascript
webwork(callback);
```
callback is a node style callback ie `function(err, result) {}`

## [JSBin Demo](http://jsfiddle.net/uqcFM/59/)

## Example
```javascipt
var goodWorker = webwork(function (data) {
    return "!!" + data  + "!!";
});
var badWorker = webwork(function (data) {
    return "!!" + data + imNotDefined + "!!";
});

goodWorker("Test123", function(err, result) {
    if (err) return alert("goodWorker Errored with " + err.message);
    alert("first goodWorker returned with " + result);
});
goodWorker("Test123", function(err, result) {
    if (err) return alert("goodWorker Errored with " + err.message);
    alert("second goodWorker returned with " + result);
});
badWorker("Test456", function(err, result) {
    if (err) return alert("badWorker Errored with " + err.message);
    alert("badWorker returned with " + result);
});
alert("Since webworkers are async this should happen first.\nThe callbacks may fire in any order");
```

The astute may realize that they can access the e variable inside the callback
