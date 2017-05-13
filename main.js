// Displays a url by appending a img tag to body
// Uses Data urls here
function show(url){
  var img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
}

function show2(hist){
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 300;
  canvas.onmousemove = function(e){
    var x = e.offsetX/(300/hist.length)|0;
    var y = e.offsetY/(300/hist.length)|0;
    graph(hist[x][y],canvas);
  };
  document.body.appendChild(canvas);
  graph(hist[0][0],canvas);
}

// Downloads URL as PNG
// Note: Doesn't seem to work in FireFox
function download(url,name){
  var a = document.createElement('a');
  a.href = url;
  a.download = name + ".png";
  a.click();
}

function generate(disp,triples){
  var out = new Map();
  triples.map(function(triple){
    var h = hist(triple[0],triple[1]);
    disp(graph(h),triple[2]);
    console.log("Completed ", triple[2], " at resolution ", triple[0]);
    out.set(triple[2],h);
  });
  return out;
}

function standard(func,name){
  return [10,30,50,100,300].map((a)=>[a,func,name+'-'+a]);
}

// Heap Sort Analysis pieces
function heapLoop(arr,comp){
  for(var i = arr.length-1; i > 0;i--){
    let t = arr[i];
    arr[i] = arr[0];
    arr[0] = t;
    siftDown(arr, comp, 0, 0, i-1);
  }
}

// Insert Merge pieces
function mergeStep(w){
  return function(arr,comp){
    var tmp = new Array(arr.length);
    for(var lo = 0; lo < arr.length; lo += 2*w){
      var hi = lo + w;
      if (hi >= arr.length) {
          copy(tmp, arr, lo, arr.length-1);
          break;
      }
      var top = Math.min(lo + 2*w,arr.length);
      merge(tmp, arr, lo, hi, top-1, comp);
    }
    copy(arr,tmp,0,arr.length-1);
  };
}


function quickInsertSort3(a){
  return function(arr,comp){
    var quickInsertSort3Recurse = function(arr,comp,lo,hi){
      if(lo + a < hi){
        let [a,b] = partition3(arr,comp,lo,hi);
        quickInsertSort3Recurse(arr,comp,lo,a-1);
        quickInsertSort3Recurse(arr,comp,b+1,hi);
      }else{
        insertCustom(arr,comp,lo,1,hi+1);
      }
    };
    return quickInsertSort3Recurse(arr,comp,0,arr.length-1);
  };
}

function daryHeap(d){
  var heapify = function(arr, comp){
    for(var i = Math.floor((arr.length-2)/d); i >= 0; i--){
      siftDown(arr, comp, i, 0, arr.length - 1);
    }
  };
  var siftDown = function(arr, comp, root, start, end){
    while(d*root + 1 - start <= end){
      let child = d*root+1-start;
      let tmp = root;
  
      if(comp(arr[child],arr[tmp])>0){
        tmp = child;
      }
      for(let i = 1; i < d; i++){
        if(child+i <= end && comp(arr[child+i],arr[tmp])>0){
          tmp = child + i;
        }
      }
      if(tmp  == root){
        return;
      }else{
        let t = arr[root];
        arr[root] = arr[tmp];
        arr[tmp] = t;
        root = tmp;
      }
    }
  };
  return function(arr,comp){
    heapify(arr, comp);
    for(var i = arr.length-1; i > 0;i--){
      let t = arr[i];
      arr[i] = arr[0];
      arr[0] = t;
      siftDown(arr, comp, 0, 0, i-1);
    }
  };
}

function scale(){
  var c = document.createElement('canvas');
  c.width = 300;
  c.height = 100;
  var ctx = c.getContext('2d');
  for(var i = 0; i < 300; i++){
    ctx.fillStyle = 'hsl(' + i + ',100%,50%)'
    ctx.fillRect(i,0,1,100);
  }
  return c.toDataURL();
}
var jsSorts = [ [10, ()=>0, 'forward'], [10, (a)=>a.reverse(), 'backward'],                                       // Introduction
  ...standard(bubbleSort,'bubble'),...standard(insertionSort,'insertion'),...standard(selectionSort,'selection'), // Simple algorithms
  ...standard(heapSort, 'heap'),   ...standard(mergeSort,    'merge'), ...standard(quickSort,    'quick'),        // Effecient algorithms
  [300, (a,c)=>heapify(a,c,0,a.length), 'heapify-300'], [300, heapLoop, 'heap-loop-300'],                         // Heap Analysis
  [50, daryHeap(3), 'ternary-heap-50'], [50, daryHeap(4), '4ary-heap-50'],
  [300, mergeStep(1), 'merge-step-1'], [300, mergeStep(2), 'merge-step-2'],[300, mergeStep(4), 'merge-step-4'],   // Merge Analysis
  [300, mergeStep(8), 'merge-step-8'],[300, mergeStep(16), 'merge-step-16'],[300, mergeStep(32), 'merge-step-32'],
  [300, mergeStep(64), 'merge-step-64'],[300, mergeStep(128), 'merge-step-128'],[300, mergeStep(256), 'merge-step-256'],
  
  
  // Firefox Array.sort Analysis
  [10, boundedInsertionSort, 'bounded-insertion-10'],
  ...standard(mergeInsertSort, 'merge-insert'),
  ...standard(mergeInsertSortOpt, 'merge-insert-opt'),
  
  
  
  // Chrome Array.sort Analysis
  [5, insertionSort,    'insertion-5'],[12, insertionSort,    'insertion-12'],[15, insertionSort,    'insertion-15'],
  ...standard(quickInsertSort, 'quick-insert'),
  ...standard(quickInsertSort2,'quick-insert2'),
  [100, quickInsertSort3(20), 'quick-insert-20-100'],[100, quickInsertSort3(30), 'quick-insert-30-100'],[100, quickInsertSort3(40), 'quick-insert-40-100'],[100, quickInsertSort3(50), 'quick-insert-50-100']
  ]

var chromeSorts = [
    [5, (a,b)=>a.sort(b), 'Array.sort-5'],[12, (a,b)=>a.sort(b), 'Array.sort-12'],[15, (a,b)=>a.sort(b), 'Array.sort-15'], //special cases for comparing to insert sort
    ...standard((a,b)=>a.sort(b),'Array.sort')                                                                             //general cases
  ];

var firefoxSorts = [
    ...standard((a,b)=>a.sort(b),'FArray.sort') //general cases
  ];

function composeHeap(m,disp){
  var heapify = m.get('heapify-300');
  var loop    = m.get('heap-loop-300');
  disp(graph(compose(heapify,loop)),'composed-heap-300');
}

function composeMergeStep(m,disp){
  var start = m.get('merge-step-1');
  for(var i = 2; i <= 256; i*=2){
    start = compose(start,m.get('merge-step-'+i));
    disp(graph(start));
  }
}

function composeBackwardsMergeStep(m,disp){
  var start = m.get('merge-step-256');
  for(var i = 128; i >= 1; i/=2){
    start = compose(m.get('merge-step-'+i),start);
    disp(graph(start),'merge-steps-'+i+'-256');
  }
}


