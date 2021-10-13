var Model = function(src){
    
    this.verties = [];
    this.indexBuffer = [];
    this.readModelFromSrc(src);
}

Model.prototype.readModelFromSrc = function (src){
    var rawFile = new XMLHttpRequest(); 
    rawFile.open("GET", src, true); 
    
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) // readyState = 4: request finished and response is ready
        {
            
            if(rawFile.status === 200 || rawFile.status === 0) // status 200: "OK"
            {
                
                var allText = rawFile.responseText; 
                var textToArray = allText.split(/\n|\rn|\nr|\r/);
                for(var i = 0; i < textToArray.length;i++){
                    if (ts[i][0] == "v")
                        {
                            var singleVertexSplit = textToArray[i].split(" ");
                            var tempVertex = new Vertex(parseFloat(singleVertexSplit[1]), parseFloat(singleVertexSplit[2]), parseFloat(singleVertexSplit[3]), 0,0,0);
                            this.verties.push(tempVertex);
                        }
                    else if (ts[i][0] == "f")
                        {
                            var singleVertexSplit = ts[i].split(" ");
                            for (var j = 1; j < singleVertexSplit.length; j++){
                                var indexSplit = singleVertexSplit[j].split('/');
                                indexBuffer.push(parseInt(indexSplit[0]) - 1);
                                //console.log(indexSplit);
                            }
                            
                        }
                }
                console.log(textToArray); 
            }
        }
    }
    rawFile.send(); //Sends the request to the server Used for GET requests with param null
}


