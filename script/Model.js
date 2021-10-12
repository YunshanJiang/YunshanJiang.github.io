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
        if(rawFile.readyState === 4) // readyState = 4: request finished and response is ready
        {
            
            if(rawFile.status === 200 || rawFile.status === 0) // status 200: "OK"
            {
                
                var allText = rawFile.responseText; //  Returns the response data as a string
                console.log(allText); // display text on the console
            }
        }
    }
    rawFile.send(); //Sends the request to the server Used for GET requests with param null
}


