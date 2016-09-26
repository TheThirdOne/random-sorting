function hist(n,sort){
  var h = (new Array(n).fill(0)).map(()=>(new Array(n)).fill(0));
  var arr = (new Array(n)).fill(0);
  for(var i = 0; i < 100000; i++){
    arr = arr.map((a,b)=>b); //convert to ascending array
    sort(arr,()=>Math.floor(Math.random()*3-1))
    for(var k = 0; k < n;k++){
      h[arr[k]][k]++;
    }
  }
  return h;
}

function display(hist){
  var c = document.createElement('canvas');
  c.width = 300;
  c.height = 400;
  var ctx = c.getContext('2d');
  var m = max(0,hist);
  var a = 300/hist.length, b = 300/hist[0].length;
  
  var hist2 = new Array(360).fill(0);
  for(var i = 0; i < hist.length; i++){
    for(var k = 0; k < hist[0].length;k++){
      let hue = Math.floor(300*hist[i][k]/m);

      if(hue > 299){
        hue = 299;
      }

      hist2[hue]++;
      ctx.fillStyle = 'hsl(' + hue + ',100%,50%)'
      ctx.fillRect(i*a,k*b,a,b);
    }
  }
  
  m = max(0,hist2);
  for(var i = 0; i < 360; i++){
    ctx.fillStyle = 'hsl(' + i + ',100%,50%)'
    ctx.fillRect(i,400-Math.floor(100*hist2[i]/m),1,Math.floor(100*hist2[i]/m));
  }
  return c.toDataURL();
}

function max(init,arr){
  if(Array.isArray(arr)){
    return arr.reduce(max,init);
  }else{
    return Math.max(init,arr);
  }
}
