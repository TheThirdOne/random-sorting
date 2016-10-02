function bubbleSort(arr,comp){
  for(var i = arr.length-1; i > 0;i--){
    for(var k = 0; k < i; k++){
      if(comp(arr[k],arr[k+1]) > 0){
        let temp = arr[k];
        arr[k]   = arr[k+1];
        arr[k+1] = temp;
      }
    }
  }
}


function insertionSort(arr,comp){
  for(var i = 1; i < arr.length;i++){
    for(var k = i; k > 0; k--){
      if(comp(arr[k-1],arr[k]) > 0){
        let temp = arr[k];
        arr[k]   = arr[k-1];
        arr[k-1] = temp;
      }else{
        break;
      }
    }
  }
}

function selectionSort(arr,comp){
  for(var i = 0; i < arr.length;i++){
    let j = i;
    for(var k = i+1; k < arr.length; k++){
      if(comp(arr[j],arr[k]) > 0){
        j = k;
      }
    }
    let temp = arr[i];
    arr[i]   = arr[j];
    arr[j] = temp;
  }
}

function shellSort(arr,comp){
  var h = 1;
  for(; h < arr.length; h = 3*h+1);
  for(; h > 0; h = Math.floor(h / 3)){
    for(var i = 0; i < h; i ++){
      insertCustom(arr,comp,i,h,arr.length);
    }
  }
}

//insertion sort with custom increment, initial position and end position
function insertCustom(arr,comp,start,increment,end){
  for(var i = start+increment; i < end; i+=increment){
    for(var k = i; k - increment >= 0; k -= increment){
      if(comp(arr[k-increment],arr[k]) > 0){
        let temp = arr[k];
        arr[k]   = arr[k-increment];
        arr[k-increment] = temp;
      }else{
        break;
      }
    }
  }
}

function quickSort(arr,comp){
  return quickSortRecurse(arr,comp,0,arr.length-1);
}

//quicksort on a slice of the array
function quickSortRecurse(arr,comp,lo,hi){
  if(lo < hi){
    let pivot = partition(arr,comp,lo,hi);
    quickSortRecurse(arr,comp,lo,pivot-1);
    quickSortRecurse(arr,comp,pivot+1,hi);
  }
}

function partition(arr,comp,lo,hi){
  var pivot = arr[hi];
  var k = lo;
  for(var i = lo; i < hi;i++){
    if(comp(arr[i],pivot) < 0){
      let temp = arr[i];
      arr[i]   = arr[k];
      arr[k]   = temp;
      k++;
    }
  }
  arr[hi] = arr[k];
  arr[k]  = pivot;
  return k;
}

function mergeSort(arr,comp){
  return mergeSortRecurse(arr,comp,0,arr.length-1,0);
}

function mergeSortRecurse(arr,comp,start,end,l){
  if(start >= end){
    return;
  }
  var a = Math.floor(end/2+start/2);
  mergeSortRecurse(arr,comp,start,a,l+1);
  mergeSortRecurse(arr,comp,a+1,end,l+1);

  // merge
  var tmp = arr.slice(start,a+1); // move first elements out of the way for the merge.
  var i = 0, k = a+1;             // indexes for subarrays
  for(var j = start; j < end+1;j++){
    if(i > a-start){              // if the first subarray is empty
      arr[j] = arr[k];
      k++;
    }else if(k > end){            // if the second subarray is empty
      arr[j] = tmp[i];
      i++;
    }else{
      if(comp(tmp[i],arr[j])>0){  // otherwise compare and move the smaller one
        arr[j] = arr[k];
        k++;
      }else{
        arr[j] = tmp[i];
        i++;
      }
    }
  }
}


function quickInsertSort(arr,comp){
  return quickInsertSortRecurse(arr,comp,0,arr.length-1);
}

//quicksort on a slice of the array
function quickInsertSortRecurse(arr,comp,lo,hi){
  if(lo < hi)
    if(lo + 10 < hi){ //if sub array > 10 elements, partition otherwise insert
      let pivot = partition(arr,comp,lo,hi);
      quickInsertSortRecurse(arr,comp,lo,pivot-1);
      quickInsertSortRecurse(arr,comp,pivot+1,hi);
    }else{
      insertCustom(arr,comp,lo,1,hi+1);
    }
}
function heapSort(arr,comp){
  heapSortCustom(arr,comp,0,arr.length);
}

function heapSortCustom(arr, comp,start,end){
  heapify(arr, comp, start, end);
  for(var i = end-1; i > start;i--){
    let t = arr[i];
    arr[i] = arr[start];
    arr[start] = t;
    siftDown(arr, comp, start, start, i-1)
  }
}
function heapify(arr, comp,start,end){
  for(var i = Math.floor(((end-1)+start-1)/2); i >= start; i--){
    siftDown(arr, comp, i, start, end - 1);
  }
}
function siftDown(arr, comp, root, start, end){
  while(2*root + 1 - start <= end){
    let child = 2*root+1-start;
    let tmp = root;

    if(comp(arr[child],arr[tmp])>0){
      tmp = child;
    }
    if(child+1 <= end && comp(arr[child+1],arr[tmp])>0){
      tmp = child + 1;
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
}