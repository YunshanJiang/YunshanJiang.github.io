var Model = function(src){
    
    this.verties = [];
    this.indexBuffer = [];
    //this.readModelFromSrc(src);
}

Model.prototype.readModelFromSrc = function (src){
    var rawFile = new XMLHttpRequest(); 
    rawFile.open("GET", src, true); 
    
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) 
        {
            
            if(rawFile.status === 200 || rawFile.status === 0) 
            {
                
                var allText = rawFile.responseText; 
                var textToArray = allText.split(/\n|\rn|\nr|\r/);
                console.log(this);
                for(var i = 0; i < textToArray.length;i++){
                    var singleVertexSplit = textToArray[i].split(" ");
                    if (singleVertexSplit[0] == "vt")
                        {
                            
                        }
                    else if (singleVertexSplit[0] == "vn")
                        {
                             
                        }
                    else if (singleVertexSplit[0] == "v")
                        {
                            
                            var tempVertex = new Vertex(parseFloat(singleVertexSplit[1]), parseFloat(singleVertexSplit[2]), parseFloat(singleVertexSplit[3]), 0,0,255);
                            console.log(this.verties);
                            this.verties.push(tempVertex);
                        }
                    else if (textToArray[i][0] == "f")
                        {
                            var singleVertexSplit = textToArray[i].split(" ");
                            for (var j = 1; j < singleVertexSplit.length; j++){
                                var indexSplit = singleVertexSplit[j].split('/');
                                this.indexBuffer.push(parseInt(indexSplit[0]) - 1);
                                //console.log(indexSplit);
                            }
                            
                        }
                }
                
            }
        }
    }.bind(this);
    rawFile.send(); 
}


