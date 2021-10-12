document.write("<script src='script/Device.js'></script>");
var Context = function Context(){
  this.renderTargetView = null;  
  this.viewport = null;
  this.vertexShader = null;
  this.pixelShader = null;
    this.zBuffer = null;
  this.setRenderTargetView = function(renderTargetView){
      this.renderTargetView = renderTargetView;
  }
  this.setViewport = function(viewport){
      this.viewport = viewport;
  }
  this.clear = function(){
    for (var y = viewport.startHeight; y <viewport.endHeight; y++)
    {
        var startBufferIndex = y * viewport.canvasWidth * 4;
        for (var x = viewport.startWidth; x < viewport.endWidth; x++)
            {
             renderTargetView[startBufferIndex + x * 4] = 0;
             renderTargetView[startBufferIndex + x * 4 + 1] = 0;
             renderTargetView[startBufferIndex + x * 4 + 2] = 0;
             renderTargetView[startBufferIndex + x * 4 + 3] = 255;
                
            }
    }
      for (var i = 0; i < zBuffer.m_BUFFER.length;i++){
          zBuffer.m_BUFFER[i] = Number.MAX_SAFE_INTEGER;
      }
  }
  this.drawLine = function(vector1, vector2){
      if (vector1 != null && vector2 != null)
          {
              
          
      var dx = vector2.x - vector1.x;
      var dy = vector2.y - vector1.y;
      
      var steps = Math.abs(dy);
      if (Math.abs(dx) > Math.abs(dy))
          {
              steps = Math.abs(dx);
          }
      var startX = vector1.x;
      var startY = vector1.y;
      
      dx /= steps;
      dy /= steps;
     
      for (var i = 0; i < steps; i++)
          {
              var startBufferIndex = Math.round(startY) * viewport.canvasWidth * 4;
              renderTargetView[startBufferIndex + Math.round(startX) * 4] = 0;
             renderTargetView[startBufferIndex + Math.round(startX) * 4 + 1] = 255;
             renderTargetView[startBufferIndex + Math.round(startX) * 4 + 2] = 0;
             renderTargetView[startBufferIndex + Math.round(startX) * 4 + 3] = 255;
              startX = startX + dx;
              startY = startY + dy;
          }
          }
  }
  
  this.drawTrianglesLineMode = function(verties){
      //console.log(verties);
      for (var i = 0; i < verties.length; i+=3)
          {
      this.drawLine(verties[i].position, verties[i+1].position);
      this.drawLine(verties[i+1].position, verties[i+2].position);
      this.drawLine(verties[i+2].position, verties[i].position);
          }
}
  this.drawTrianglesFace = function(verties){
      for (var i = 0; i < verties.length; i+=3)
          {
              this.drawTriangleFace(verties[i],verties[i + 1],verties[i + 2]);
    //  this.drawLine(verties[i].position, verties[i+1].position);
    //  this.drawLine(verties[i+1].position, verties[i+2].position);
     // this.drawLine(verties[i+2].position, verties[i].position);
          }
  }
  this.drawTriangleFace = function(vertex1, vertex2, vertex3){
      
      if (vertex1.position.y > vertex2.position.y)
          {
              [vertex1, vertex2] = [vertex2,vertex1];
          }
      if (vertex2.position.y > vertex3.position.y)
          {
              [vertex2, vertex3] = [vertex3,vertex2];
          }
      if (vertex1.position.y > vertex2.position.y)
          {
               [vertex1, vertex2] = [vertex2,vertex1];
          }
      if (vertex1.position.y == vertex2.position.y)
          {
              
              if (vertex1.position.x > vertex2.position.x)
                  {
                      [vertex1, vertex2] = [vertex2,vertex1];
                  }
               this.drawTopFlatTriangle(vertex1, vertex3, vertex2);
          }
      else if (vertex2.position.y == vertex3.position.y)
          {
             
               if (vertex2.position.x > vertex3.position.x)
                  {
                      [vertex2, vertex3] = [vertex3,vertex2];
                  }
               this.drawBottomFlatTriangle(vertex2, vertex1, vertex3);
          }
      else{
          
          var midY = Math.ceil(vertex2.position.y - 0.5);
          var midLerpValue = (midY - Math.ceil(vertex1.position.y - 0.5)) / 
              (Math.ceil(vertex3.position.y - 0.5) - Math.ceil(vertex1.position.y - 0.5));
         var midVertexOut = lerpVertexOut(vertex1, vertex3, midLerpValue);
          //console.log(vertex1,vertex2,vertex3);
          if (midVertexOut.position.x > vertex2.position.x)
              { 
                 
                   this.drawBottomFlatTriangle(vertex2, vertex1, midVertexOut);
                   this.drawTopFlatTriangle(vertex2, vertex3, midVertexOut);
                  
              }
          else
          {
             // console.log(vertex2,vertex3,midVertexOut);
                   this.drawBottomFlatTriangle(midVertexOut, vertex1, vertex2);
                   this.drawTopFlatTriangle(midVertexOut, vertex3, vertex2);
                  
          }
          
          }
     // console.log(vertex1.color.rgb);
  }
  
  this.drawTopFlatTriangle = function(vertex1, vertex3, vertex2){
      
      var startY = Math.ceil(vertex3.position.y - 0.5);
      var endY = Math.ceil(vertex1.position.y - 0.5);
      //console.log(vertex1.color.rgb);
    // console.log(vertex1.position.y, vertex2.position.x);
      if (startY == endY){
          this.drawScanLine(vertex1, vertex2);
         // console.log(startY);
          return;
      }

      for (var i = startY; i >= endY; i--)
          {
              
              var factor = (i - endY) / (startY - endY);
              var xl = lerpVertexOut(vertex1, vertex3, factor);
              var xr = lerpVertexOut(vertex2, vertex3, factor);
              //console.log(factor);
              this.drawScanLine(xl, xr);
          }
          
  }
  this.drawBottomFlatTriangle = function(vertex2, vertex1, vertex3){
      //console.log(vertex2, vertex3);
      var startY = Math.ceil(vertex3.position.y - 0.5);
      var endY = Math.ceil(vertex1.position.y - 0.5);
       if (startY == endY){
          this.drawScanLine(vertex2, vertex3);
          //console.log(startY);
          return;
      }

      for (var i = startY; i >= endY; i--)
          {
              //console.log(i);
              var factor = (i - endY) / (startY - endY);
              var xl = lerpVertexOut(vertex1, vertex2, factor);
              var xr = lerpVertexOut(vertex1, vertex3, factor);
             //  console.log(xl, xr);
              this.drawScanLine(xl, xr);
          }
  }
  
  this.drawScanLine = function(vertex1, vertex2){
      
      
      var startX = Math.ceil(vertex1.position.x - 0.5);
      var endX = Math.ceil(vertex2.position.x - 0.5);
      var steps = endX - startX;
      var startY = Math.ceil(vertex1.position.y - 0.5);
      
      var startZ = vertex1.position.z;
      var zDifference = vertex2.position.z - vertex1.position.z;
      var incrementZValue = zDifference / steps;
      
      var startColor = vertex1.color.rgb;
      var colorDifference = vertex2.color.rgb.minus(vertex1.color.rgb);
      var incrementColorValue = colorDifference.time(1 / steps);
      //console.log(startZ);
      for (var i = 1; i <= steps; i++)
          {
              //zBuffer test
              if (zBuffer.m_BUFFER[startY * viewport.canvasWidth + startX] > startZ)
                  {
                      
              var pixelColor = this.pixelShader.pixel(new VertexOut(startX, startY,startZ,startColor.x,startColor.y,startColor.z));
              var startBufferIndex = startY * viewport.canvasWidth * 4;
                     
              renderTargetView[startBufferIndex + startX * 4] =  Math.round(pixelColor.rgb.x);
             renderTargetView[startBufferIndex + startX * 4 + 1] = Math.round(pixelColor.rgb.y);
             renderTargetView[startBufferIndex + startX * 4 + 2] = Math.round(pixelColor.rgb.z);
             renderTargetView[startBufferIndex + startX * 4 + 3] = 255;
             zBuffer.m_BUFFER[startY * viewport.canvasWidth + startX] = startZ;
                     // console.log(startBufferIndex + startX * 4); 
                  }
              
               startX++;
              startColor = startColor.add(incrementColorValue);
              startZ += incrementZValue;
             //console.log(startX);
          }
  }
  

  this.setVertexShader = function(vertexShader){
      this.vertexShader = vertexShader;
  }
  
  this.setPixelShader = function(pixelShader){
      this.pixelShader = pixelShader;
  }
  this.setZBuffer = function(zBuffer){
      this.zBuffer = zBuffer;
  }
}
