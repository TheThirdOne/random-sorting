function hist(n,sort){
  // Make an empty nxn array and empty array
  var h = makeArray(n,2)
  var h = makeArray(n,2);
  var arr = (new Array(n)).fill(0);
  
  var randomComparator = ()=>Math.floor(Math.random()*3-1);
  
  // Run the sort 100000 times
  for(var i = 0; i < 100000; i++){
    if(i === 50000)
      console.log('halfway');
    arr = arr.map((_,i)=>i); // convert each element into its index
    sort(arr,randomComparator);
    for(var k = 0; k < n;k++){
      // Use the initial index (the value of the cell) and the final index (k) to update the histogram
      h[arr[k]][k]++;
    }
  }
  return h;
}

function makeArray(n,d){
  if(d == 1){
    return new Array(n).fill(0);
  }
  return new Array(n).fill(0).map(()=>makeArray(n,d-1));
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

function graph(hist, c = document.createElement('canvas')){
  c.width = 300;
  c.height = 300;
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
  
  /*m = max(0,hist3);
  for(var i = 0; i < 360; i++){
    ctx.fillStyle = 'hsl(' + i + ',100%,50%)'
    ctx.fillRect(i,400-Math.floor(100*hist3[i]/m),1,Math.floor(100*hist3[i]/m));
  }*/
  return c.toDataURL();
}

function max(init,arr){
  if(Array.isArray(arr)){
    return arr.reduce(max,init);
  }else{
    return Math.max(init,arr);
  }
}

//essentially just a matrix multiplication assuming nxn * nxn
function compose(f,g){
  var n = f.length;
  var out = (new Array(n)).fill(0).map(()=>new Array(n).fill(0));
  for(var x = 0; x < n; x++){
    let h = f[x];
    for(var y = 0; y < n; y++){
      let i = g[y];
      for(var k = 0; k < n;k++){ //rescale i by h[y] and add to out[x]
        out[x][k] += h[y]*i[k];
      }
    }
  }
  return out;
}