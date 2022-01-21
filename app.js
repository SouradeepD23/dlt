import {data} from './latest-news.js';
import http from 'http';

const requestListener = (req, res)=>{
    console.log("Request is Incoming");
    // console.log(data);
    const jsonContent = JSON.stringify(data,null,1);
    res.end(jsonContent);
};

const server = http.createServer(requestListener);
  
server.listen(3000,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at localhost:3000");
    else 
        console.log("Error Occured");
});
