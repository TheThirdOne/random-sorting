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
function bounds(hist2){
  var total = 0, s = sum(hist2);
  var a, b;
  for(var i = 0; i < hist2.length;i++){
    total += hist2[i];
    if(total > s/100){
      a = i-1;
      break;
    }
  }
  total = 0;
  for(var i = hist2.length-1; i >= 0;i--){
    total += hist2[i];
    if(total > s/100){
      b = i+1;
      break;
    }
  }
  return [a,b];
}
function computeHist2(hist){
  var m = max(0,hist);
  
  var hist2 = new Array(1200).fill(0);
  for(var i = 0; i < hist.length; i++){
    for(var k = 0; k < hist[0].length;k++){
      let hue = Math.floor(1200*Math.sqrt(hist[i][k])/Math.sqrt(m));

      if(hue >= 1199){
        hue = 1199;
      }

      hist2[hue]++;
    }
  }
  return hist2;
}
var sum = (a)=>a.reduce((a,b)=>a+b,0);



function display(hist){
  var c = document.createElement('canvas');
  c.width = 300;
  c.height = 400;
  var ctx = c.getContext('2d');
  var m = max(0,hist);
  var a = 300/hist.length, b = 300/hist[0].length;
  

  
  var hist2 = computeHist2(hist);           //computes histogram of pixels hues vs count
  var [lower,upper] = bounds(hist2);        //computes bounds such that 98% of pixels don't get clipped
  var hist3 = new Array(300).fill(0);
  for(var i = 0; i < hist.length; i++){
    for(var k = 0; k < hist[0].length;k++){
      let hue = 1200*Math.sqrt(hist[i][k])/Math.sqrt(m);

      hue = Math.floor(300/(upper-lower)*(hue - lower));//rescale so the lower bound = 0 and upper bound = 300 and sample with dx=1
      hue = Math.min(Math.max(hue,0),299);  //clamp to 0-299

      hist3[hue]++;

      ctx.fillStyle = 'hsl(' + hue + ',100%,50%)';
      ctx.fillRect(i*a,k*b,a,b);
    }
  }
  
  m = max(0,hist3);
  for(var i = 0; i < 360; i++){
    ctx.fillStyle = 'hsl(' + i + ',100%,50%)'
    ctx.fillRect(i,400-Math.floor(100*hist3[i]/m),1,Math.floor(100*hist3[i]/m));
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
