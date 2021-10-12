document.write("<script src='script/Device.js'></script>");
document.write("<script src='script/Context.js'></script>");
var SwapChain = function SwapChain(){
  //member
  this.device = null;
  this.deviceContext = null;  
  this.frameBuffer = null;
  this.canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var imageData = null;
  this.createDevice = function()
  {
      this.device = new Device();
      return this.device;
  }
    this.createContext = function()
  {
      this.deviceContext = new Context();
      return this.deviceContext;
  }
  this.getBuffer = function(frameBuffer, width, height)
  {
      this.frameBuffer = frameBuffer.m_BUFFER;
      imageData = new ImageData(this.frameBuffer,width,height);
  }
  
  this.present = function()
  {
     // console.log(this.frameBuffer);
      if (this.frameBuffer != null)
          {
              
              /*for (var y = this.deviceContext.viewport.startHeight; y <this.deviceContext.viewport.endHeight; y++)
    {
        var startBufferIndex = y * this.deviceContext.viewport.canvasWidth * 4;
        for (var x = this.deviceContext.viewport.startWidth; x < this.deviceContext.viewport.endWidth; x++)
            {
             this.frameBuffer[startBufferIndex + x * 4] = 0;
             this.frameBuffer[startBufferIndex + x * 4 + 1] = 255;
             this.frameBuffer[startBufferIndex + x * 4 + 2] = 0;
             this.frameBuffer[startBufferIndex + x * 4 + 3] = 255;
                
            }
    }*/
             // console.log(this.frameBuffer[353308]);
              context.putImageData(imageData, 0,0);
          }
  }
}