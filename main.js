// Displays a url by appending a img tag to body
// Uses Data urls here
function show(url){
  var img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
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
    siftDown(arr, comp, 0, 0, i-1)
  }
}

// Insert Merge pieces
function mergeStep(w){
  return function(arr,comp){
    var tmp = new Array(arr.length)
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


var jsSorts = [ [10, ()=>0, 'forward'], [10, (a)=>a.reverse(), 'backward'],                                       // Introduction
  ...standard(bubbleSort,'bubble'),...standard(insertionSort,'insertion'),...standard(selectionSort,'selection'), // Simple algorithms
  ...standard(heapSort, 'heap'),   ...standard(mergeSort,    'merge'), ...standard(quickSort,    'quick'),        // Effecient algorithms
  [300, (a,c)=>heapify(a,c,0,a.length), 'heapify-300'], [300, heapLoop, 'heap-loop-300'],                         // Heap Analysis
  [300, mergeStep(1), 'merge-step-1'], [300, mergeStep(2), 'merge-step-2'],[300, mergeStep(4), 'merge-step-4'],   // Merge Analysis
  [300, mergeStep(8), 'merge-step-8'],[300, mergeStep(16), 'merge-step-16'],
  [300, mergeStep(32), 'merge-step-32'],[300, mergeStep(64), 'merge-step-64'],[300, mergeStep(128), 'merge-step-128'],
  
  
  // Firefox Array.sort Analysis
  [10, boundedInsertionSort, 'bounded-insertion-10'],
  ...standard(mergeInsertSort, 'merge-insert'),
  ...standard(mergeInsertSortOpt, 'merge-insert-opt'),
  
  
  
  // Chrome Array.sort Analysis
  [5, insertionSort,    'insertion-5'],    [12, insertionSort,    'insertion-12'],    [15, insertionSort,    'insertion-15'],
  ...standard(quickInsertSort, 'quick-insert'),
  ...standard(quickInsertSort2,'quick-insert2')
]

var chromeSorts = [
    [5, (a,b)=>a.sort(b), 'Array.sort-5'],[12, (a,b)=>a.sort(b), 'Array.sort-12'],[15, (a,b)=>a.sort(b), 'Array.sort-15'], //special cases for comparing to insert sort
    ...standard((a,b)=>a.sort(b),'Array.sort')                                                                             //general cases
  ];

var firefoxSorts = [
    ...standard((a,b)=>a.sort(b),'FArray.sort') //general cases
  ];

//TODO: compose(heapify,heaploop)


function composeMergeStep(m){
  var start = m.get('merge-step-1');
  for(var i = 2; i <= 128; i*=2){
    start = compose(start,m.get('merge-step-'+i));
    disp(graph(start));
  }
}


