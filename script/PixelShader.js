document.write("<script src='script/Math.js'></script>");
document.write("<script src='script/Color.js'></script>");
var PixelShader = function PixelShader(){
  this.pixel = function(vertexOut){
      
      return new Color(vertexOut.color.rgb.x, vertexOut.color.rgb.y,vertexOut.color.rgb.z);
  }
}
