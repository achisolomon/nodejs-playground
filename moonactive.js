var http = require('http');
var url = require('url');
var os = require("os");
/*
var hostname = os.hostname();
*/
var hostname = "localhost";
var requestforward = require('request'); 

var serviceProxyPort =8080;
var dummyServicePortStart =8081;


var service1Msg = "Hello World from ";

for( i =1 ; i <=3 ; ++i)
{
        createDummyService("service "+i,dummyServicePortStart+i-1,hostname,service1Msg)
}

console.log('creating service1 on port '+serviceProxyPort);
http.createServer(
                function handler(req, res)
                {
                        try
                        {                        
                                console.log("\nproxy service got a req! ");
                                
                                var host = req.headers.host;
                                
                                console.log("Got request from req.headers.host= "+host);
                                console.log("req.url= "+req.url);
                                
                                if (typeof host == 'undefined' || host == null )
                                {
                                        var msg = "This is request origin is not supported , host = "+ host;
                                        console.log(msg);
                                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                                        res.end(msg);
                                }

                                var forwardtoo = null;
                                var forwardAddress =null;

                                if (host.indexOf ("opstest1")> -1 )
                                {
                                        forwardAddress='http://'+hostname+':'+dummyServicePortStart+'/';
                                        console.log("forwarding to "+forwardAddress);
                                        forwardtoo = requestforward(forwardAddress);
                                }
                                else if (host.indexOf ("opstest2")> -1 )
                                {
                                        var service2Port=dummyServicePortStart+1;
                                        forwardAddress='http://'+hostname+':'+service2Port+'/';
                                        console.log("forwarding to "+forwardAddress);
                                        forwardtoo = requestforward(forwardAddress);
                                }
                                else if (host.indexOf ("opstest3")> -1 )
                                {
                                        var service3Port=dummyServicePortStart+2;
                                        forwardAddress='http://'+hostname+':'+service3Port+'/';
                                        console.log("forwarding to "+forwardAddress);
                                        forwardtoo = requestforward(forwardAddress);
                                }
                                else
                                {       forwardAddress='http://'+hostname+':'+dummyServicePortStart+'/';
                                        console.log("did not find a valid dns record to map service to, forwarding to default service "+forwardAddress);
                                        forwardtoo = requestforward(forwardAddress);
                                }

                                req.pipe(forwardtoo);
                                forwardtoo.pipe(res);
                        }
                        catch (err) {
                                
                                console.error("An Error occured in proxy service: \n "+err);
                        }

                }).listen(serviceProxyPort, hostname );

console.log('proxy service is up');

function createDummyService(serviceName, servicePort,serviceHostname,serviceMsg) {
        console.log('creating '+serviceName+' on port ' + servicePort);
        http.createServer(function handler(req, res) {
                
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                var msg = serviceMsg+serviceName;
                res.end(msg);
                console.log(msg);
        }).listen(servicePort, hostname);
        console.log(serviceName+' is up');
}

