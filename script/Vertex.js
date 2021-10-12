document.write("<script src='script/Math.js'></script>");
document.write("<script src='script/Color.js'></script>");
var Vertex = function(x,y,z,r,g,b){
    this.position = new Vector3(x,y,z);
    this.color = new Color(r,g,b);
    this.color.changeScale();
   // var test = this.color.rgb;
    //console.log(test);
   // console.log(this.color);
}

var VertexOut = function(x,y,z,r,g,b){
    this.position = new Vector3(x,y,z);
    this.color = new Color(r,g,b);
}

function lerpVertexOut(vertex1, vertex2, value){
    //console.log(vertex1.position.z, vertex2.position.z);
    var position = lerpVector3(vertex1.position, vertex2.position, value);
    var color = lerpVector3(vertex1.color.rgb, vertex2.color.rgb, value);
   // console.log(position.z);
    return new VertexOut(position.x, position.y, position.z, color.x, color.y, color.z);
}