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
  return triples.map(function(triple){
    var h = hist(triple[0],triple[1]);
    disp(graph(h),triple[2]);
    console.log("Completed ", triple[2], " at resolution ", triple[0]);
    return [triple[0],h,triple[2]];
  });
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



var tests = [ [10, ()=>0, 'forward'], [10, (a)=>a.reverse(), 'backward'],                                         // Introduction
  ...standard(bubbleSort,'bubble'),...standard(insertionSort,'insertion'),...standard(selectionSort,'selection'), // Simple algorithms
  ...standard(heapSort, 'heap'),   ...standard(mergeSort,    'merge'), ...standard(quickSort,    'quick'),        // Effecient algorithms
  [300, (a,c)=>heapify(a,c,0,a.length), 'heapify-300'], [300, heapLoop, 'heap-loop-300'],                         // Heap Analysis
  
  // Firefox Array.sort Analysis
  [10, boundedInsertionSort, 'bounded-insertion-10'],
  ...standard(mergeInsertSort, 'merge-insert'),
  
  
  
  // Chrome Array.sort Analysis
  [5, insertionSort,    'insertion-5'],    [12, insertionSort,    'insertion-12'],    [15, insertionSort,    'insertion-15'],
  [5, (a,b)=>a.sort(b), 'Array.sort-5'],[12, (a,b)=>a.sort(b), 'Array.sort-12'],[15, (a,b)=>a.sort(b), 'Array.sort-15'],
]

//TODO: compose(heapify,heaploop)







