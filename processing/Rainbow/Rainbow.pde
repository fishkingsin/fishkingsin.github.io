void setup()
{
  size(800,800);
  colorMode(HSB, height, height, height);
}
void draw()
{
  float block = 800.0/6.0;
  for(int i = 0 ; i < 6 ;i++)
  {
    noStroke();
    fill(i*block, height, height);
    int x = 0;
    float y = i*block;
    rect(0,i*block,width,(i+1)*block);
  }
  
}


