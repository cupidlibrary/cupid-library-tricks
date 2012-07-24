
var http = require('http');
var core = require('./Exports');

var fileSystem = require('fs');
var util = require('util');

var pathStatic = 'D:\\cupidlibrary'; // папка со статикой
    
function onRequest(request, response){
    var postData = '';
    
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    });

    request.addListener("end", function(){   
        if (request.method == 'GET'){
            Get();
        }
        else{
            Post();
        }
    });
    
    function Get(){
        var filePath;
        var stat, readStream;
        
        if(request.url == '/') request.url = '/index.html';
        
        filePath = pathStatic + request.url;
        if (fileSystem.existsSync(filePath)){
            stat = fileSystem.statSync(filePath);
            readStream = fileSystem.createReadStream(filePath);
        
            response.writeHead(200, {'Content-Length': stat.size});
            util.pump(readStream, response);
        }else{
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write("not file exists");
            response.end();
        }
    }
    
    function Post(){
        var data, controller;
       
        //postData = '{"controller":"search", "entity":{"login":"mylogin", "password":"mypassword"}}'; // Debuga
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
    }
}

http.createServer(onRequest).listen(8080);
