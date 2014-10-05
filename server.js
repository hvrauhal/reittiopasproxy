var user = process.env.REITTIOPAS_USER
var pass = process.env.REITTIOPAS_PASS

var http = require('http'),
    httpProxy = require('http-proxy');


var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
    req.url = req.url + "&user=" + user + "&pass=" + pass
    proxy.web(req, res, { target: 'http://api.reittiopas.fi' });
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
});

proxy.on('error', function(err, req,res) {
    console.error(err)
})

var port = process.env.PORT || 3000;
server.listen(port);
console.log("listening on port ", port )
