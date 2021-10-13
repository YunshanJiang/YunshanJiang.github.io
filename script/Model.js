var Model = function(src){
    
    this.verties = null;
    this.Index = null;
    this.readModelFromSrc(src);
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
                var textArray = allText.split(/\n|\rn|\nr|\r/);
                console.log(textArray); 
            }
        }
    }
    rawFile.send();
}


