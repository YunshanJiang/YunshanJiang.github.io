document.write("<script src='script/Math.js'></script>");
var Color = function(r, g, b){
    //console.log(r);
    
    this.rgb = new Vector3(r,g,b);
    
    //console.log(this.rgb == );
    //console.log(this);
    
}

Color.prototype.changeScale = function (){
        //console.log(this.rgb.x);
        this.rgb.x = Math.round(this.rgb.x * 255);
        this.rgb.y = Math.round(this.rgb.y * 255);
        this.rgb.z = Math.round(this.rgb.z * 255);
    }