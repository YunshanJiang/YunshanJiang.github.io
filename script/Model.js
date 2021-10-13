document.write("<script src='script/Math.js'></script>");
var Model = function(){
    
    this.verties = [];
    this.indexBuffer = [];
    //this.readModelFromSrc(src);
}
Model.prototype.scale = async function(vector){
     //console.log(this.verties.length);
    while(this.verties.length == 0)
        {
            await new Promise(r => setTimeout(r, 30));
        }
    for (var i = 0; i < this.verties.length; i++){
       
              var newPosition = scaleMatrix(vector).timeVector3OutV3(this.verties[i].position);
              this.verties[i].position = new Vector3(newPosition.x, newPosition.y, newPosition.z);
         
          }
}

Model.prototype.rotate = async function(vector){
     //console.log(this.verties.length);
    while(this.verties.length == 0)
        {
            await new Promise(r => setTimeout(r, 30));
        }
    for (var i = 0; i < this.verties.length; i++){
        
              var newPosition =  rotateMatrixZ(vector.z).
              timeVector3OutV3(rotateMatrixY(vector.y).
              timeVector3OutV3(rotateMatrixX(vector.x).
              timeVector3OutV3(this.verties[i].position)));
              this.verties[i].position = new Vector3(newPosition.x, newPosition.y, newPosition.z);
         
          }
}


Model.prototype.translate = async function(vector){
     //console.log(this.verties.length);
    while(this.verties.length == 0)
        {
            await new Promise(r => setTimeout(r, 30));
        }
    for (var i = 0; i < this.verties.length; i++){
        
              var newPosition = translationMatrix(vector).timeVector3OutV3(this.verties[i].position);
              this.verties[i].position = new Vector3(newPosition.x, newPosition.y, newPosition.z);
         
          }
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


