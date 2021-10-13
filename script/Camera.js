var Camera = function(aspectratio){
    this.cameraPosition = new Vector3(0,0,-2);
    this.cameraLookAt = new Vector3(0,0,1);
    this.cameraUp = new Vector3(0,1,0);
    this.aspectratio = aspectratio;
    this.radian = 1.4;
    this.near = 1.0;
    this.far = 10;
}