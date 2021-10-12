document.write("<script src='script/Math.js'></script>");
var VertexShader = function VertexShader(){
    this.constantBuffer = null;
   // this.camera = null;
   // this.localOrigin = new Vector3(0, 0, 0);
  this.vert = function(vertex){
     // console.log(this.constantBuffer.localOrigin);
       //var newPosition = rotateMatrixY(0.01).timeVector3OutV3(vertex.position);
       // vertex.position = new Vector3(newPosition.x, newPosition.y, newPosition.z);
      var worldPosition = localToWorld(this.constantBuffer.localOrigin, vertex.position);
      //console.log(worldPosition);
       var cameraSpace = lookAt(this.constantBuffer.camera.cameraPosition, this.constantBuffer.camera.cameraLookAt, this.constantBuffer.camera.cameraUp).timeVector3OutV4(worldPosition);
      var worldToProjection = projection(this.constantBuffer.camera.radian, this.constantBuffer.camera.aspectratio, 0.1, 10).timeVector4(cameraSpace);
      var ndc = NDC(worldToProjection);
      var screenPosition = screenSpace(Math.width, Math.height, ndc);
      
      //vertex.color.changeScale();
      //console.log(worldToProjection);
      return new VertexOut(screenPosition.x,screenPosition.y,screenPosition.z, vertex.color.rgb.x, vertex.color.rgb.y, vertex.color.rgb.z);
      
  }
}
