var http = require('http');
var port = process.env.PORT || 3000;

var infoHtml = 
    '<html>' +
    '<head>' +
    '<style>' + 
    'h1, h3, p {font-family: sans-serif;}' +
    'code {margin: 3px; padding: 3px; background-color: #ddd; border-radius: 3px;}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<h1 style="text-align: center">Timestamp Microservice</h1>' +
    '<br>' + 
    '<div style="margin-left: 4em">' +   
    '<p>Pass date as a url parameter. Both unix or natural language date formats are supported<p>'+
    '<h3>Example usage:</h3>' + 
    '<code>localhost:3000/December%2015,%202015</code>' +
    '<br><br>'+
    '<code>localhost:3000/1450137600</code>'+
    '<h3>Example output:</h3>' +
    '<code>{ "unix": 1450137600, "natural": "December 15, 2015" }</code>' +
    '</div>' +
    '</body>' +
    '</html>';

var server = http.createServer(function(req, res) {
    var response;
    if (req.url == '/') {
        response = infoHtml;
    } else {
        response = {};
        var timeStr = req.url.replace(/^\//, "").replace(/%20/, " ");
        if (/^\d+$/.test(timeStr)) timeStr = parseInt(timeStr);
        var date = new Date(timeStr);
        response.unix = date.getTime();
        response.natural = date.toDateString().replace(/^\w\w\w\s/, ""); 
        if (response.natural == "Invalid Date") response.natural = null;
        response = JSON.stringify(response);
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(response);
}).listen(port);

