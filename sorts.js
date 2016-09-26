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
  var h = 1
  for(; h < arr.length; h = 3*h+1);
  for(; h > 0; h = Math.floor(h / 3)){
    for(var i = 0; i < h; i ++){
      shellInsert(arr,comp,i,h);
    }
  }
}

//insertion sort with custom increment and initial position
function shellInsert(arr,comp,start,increment){
  for(var i = start+increment; i < arr.length; i+=increment){
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
  return quickSortRecurse(arr,comp,0,arr.length-1)  
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
