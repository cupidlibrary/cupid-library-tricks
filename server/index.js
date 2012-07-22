
var http = require('http');
var core = require('./Exports');

function onRequest(request, response){
    var postData = '';
    
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    });

    request.addListener("end", function(){
        var data, controller;
        
        //postData = '{"controller":"autorisation", "entity":{"login":"mylogin", "password":"mypassword"}}'; // Debug
        try{
		  data = JSON.parse(postData);
        }
        catch(error){
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("{error:\"invalid_json\"}");
            response.end();
        }
        
        if (data != undefined) controller = core.controllers[data.controller];
        
        if (controller != undefined && data.entity != undefined){
            controller.Execute(data.entity, request, response);
        }
        else{
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("{error:\"invalid_parametrs\"}");
            response.end();
        } 
    });
}

http.createServer(onRequest).listen(8081);
