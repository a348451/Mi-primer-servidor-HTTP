const http = require('http');
const fs = require('fs');

// HTTP => (request, response)

http.createServer((request, response)=> {

    const file = request.url == '/' ? './WWW/index.html' : `./WWW${request.url}`;
    if(request.url == '/login'){
        let data = [];
        //patrón de observador que coloca un objeto listener observando o escuchando otro objeto y reaccionando
        //a los cambios que pueda tener ese objeto observado.
        request.on("data",value => {
            data.push(value);
        }).on("end", () => {
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }
    //const data = fs.readFileSync('./WWW/index.html');
    fs.readFile(file, (err, data)=> {
        if(err){
            response.writeHead(404, {"Content-Type":"text/html"});
            response.write("not found");
            response.end();
        }else{
            const extension = request.url.split('.').pop();
            switch(extension){
                case 'txt':
                    response.writeHead(200, {"Content-Type":"text/plain"});
                break;
                case 'html':
                    response.writeHead(200, {"Content-Type":"text/html"});
                break;
                case 'csc':
                    response.writeHead(200, {"Content-Type":"text/csc"});
                break;
                case 'ico':
                    response.writeHead(200, {"Content-Type":"image/x-icon"});
                case 'js':
                    response.writeHead(200, {"Content-Type":"text/js"});
                case 'jpeg':
                    response.writeHead(200, {"Content-Type":"image/jpeg"});
            default:


            response.writeHead(200, {"Content-Type":"text/html"});
            }
            response.write(data);
            response.end();
        }
    });
}).listen(4444);