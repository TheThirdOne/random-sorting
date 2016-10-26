// Simple Algorithms
// Bubble, Insertion, Selection
function bubbleSort(arr,comp){
  for(var i = arr.length-1; i > 0;i--){        // The top j elements are sorted after j loops
    for(var k = 0; k < i; k++){                // Bubble from 0 to i
      if(comp(arr[k],arr[k+1]) > 0){           // if arr[k] > arr[k+1]
        [arr[k],arr[k+1]] = [arr[k+1],arr[k]]; //   swap arr[k] and arr[k+1]
      }
    }
  }
}


function insertionSort(arr,comp){
  // Build a sorted array 1 element at a time.
  for(var i = 1; i < arr.length;i++){
    // Insert into the sorted array arr[0:i]
    for(var k = i; k > 0; k--){
      if(comp(arr[k-1],arr[k]) > 0){          // if arr[k-1] > arr[k]
        [arr[k],arr[k-1]] = [arr[k-1],arr[k]];//   swap arr[k-1] and arr[k]
      }else{
        //arr[0:i+1] is sorted and its ready for the next interation
        break;
      }
    }
  }
}

function selectionSort(arr,comp){
  // Build a sorted array 1 element at a time.
  for(var i = 0; i < arr.length;i++){
    // Select the smallest element in arr[i:n-1]
    let j = i;
    for(var k = i+1; k < arr.length; k++){
      if(comp(arr[j],arr[k]) > 0){
        j = k;
      }
    }
    // And swap it with the bottom of arr[i]
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
}

// Effecient Algorithms
// Heap, Merge, Quick

function heapSort(arr,comp){
  // Turn arr into a heap
  heapify(arr, comp);
  for(var i = end-1; i > 0;i--){
    // The 0th element of a heap is the largest so move it to the top.
    [arr[0],arr[i]] = [arr[i],arr[0]];
    // The 0th element is no longer the largest, restore the heap property
    siftDown(arr, comp, 0, 0, i-1);
  }
}

// Convert the array into a binary heap
function heapify(arr, comp){
  // Arr[n/2-1:n-1] already satisfies the heap property because they are the leaves.
  for(var i = Math.floor((arr.length-2)/2); i >= 0; i--){
    // Restore the heap property for i
    siftDown(arr, comp, i);
  }
  // Now that the heap property is satisfied for all i from 0 to n-1, the array is a heap
}

// Make sure the root of the heap satifies the heap property,
function siftDown(arr, comp, root, start, end){
  // Stop if you reach a leave node
  while(2*root + 1 < arr.length){
    let child = 2*root+1;
    let tmp = root;
    
    // if its child is greater than it, plan to switch them
    if(comp(arr[child],arr[tmp])>0){
      tmp = child;
    }
    // if the second child is the greatest, plan to switch it
    if(child+1 <= end && comp(arr[child+1],arr[tmp])>0){
      tmp = child + 1;
    }
    
    if(tmp  == root){
      //if the root is the biggest, your are done.
      return;
    }else{
      // if a child is greater than the root, swap them and repeat with the index of the child
      [arr[root],arr[tmp]] = [arr[tmp],arr[root]];
      root = tmp;
    }
  }
}

function mergeSort(arr,comp){
  // Create some tempporary storage
  // Merging is not effecient to do in-place, so we need another array to merge into
  var a1 = arr;
  var a2 = new Array(arr.length);
  
  // Merge all non-overlapping subarrays of width w for doubling w until w > n
  for(var w = 1; w < arr.length; w *= 2){
    for(var lo = 0; lo < arr.length; lo += 2*w){
      // If hi > n, just copy a1[lo:n-1] to a2[lo:n-1]
      var hi = lo + w;
      if (hi >= arr.length) {
          copy(a2, a1, lo, arr.length-1);
          break;
      }
      // Merge a1[lo:hi-1] and a1[hi:max(hi+w,n-1)] into a2[lo:max(hi+w,n-1)]
      var top = Math.min(lo + 2*w,arr.length);
      merge(a2, a1, lo, hi, top-1, comp);
    }
    // swap which array we are copying from
    [a1,a2] = [a2,a1];
  }
  // If we the sorted data is in the copy, move it back
  if(a1 !== arr){
    copy(arr,a1,0,arr.length-1);
  }
}

function merge(a1,a2,lo,hi,top,comp){
  var j = hi;
  for(var i = lo; i <= top; i++){
    if(lo >= hi){                 // if the first subarray is empty
      a1[i] = a2[j];
      j++;
    }else if(j > top){            // if the second subarray is empty
      a1[i] = a2[lo];
      lo++;
    }else{
      if(comp(a2[lo],a2[j])>0){   // otherwise compare and move the smaller one
        a1[i] = a2[j];
        j++;
      }else{
        a1[i] = a2[lo];
        lo++;
      }
    }
  }
}

function copy(a1,a2,lo,hi){
  for(var i = lo; i <= hi; i++){
    a1[i] = a2[i];
  }
}


function quickSort(arr,comp){
  return quickSortRecurse(arr,comp,0,arr.length-1);
}

//quicksort on a slice of the array
function quickSortRecurse(arr,comp,lo,hi){
  // if lo >= hi, its sorted
  if(lo < hi){
    // Partition arr into (arr[lo:pivot-1] are < arr[pivot]) & (arr[pivot+1:hi] are >= arr[pivot])
    let pivot = partition(arr,comp,lo,hi);
    // Sort the two sub arrays
    quickSortRecurse(arr,comp,lo,pivot-1);
    quickSortRecurse(arr,comp,pivot+1,hi);
  }
}

function partition(arr,comp,lo,hi){
  // Pick the pivot value to be the top element;
  var pivot = arr[hi];
  
  var k = lo;
  for(var i = lo; i < hi;i++){
    // If the element is less than pivot, move it into arr[lo:k]
    if(comp(arr[i],pivot) < 0){
      [arr[i],arr[k]] = [arr[k],arr[i]];
      k++;
    }
  }
  
  // Move the pivot into its final place;
  [arr[hi],arr[k]] = [arr[k],pivot];
  
  // Return the index of pivot
  return k;
}

// FireFox analysis

// Runs Insertion sort on 3 wide sub arrays along the entire array
function boundedInsertionSort(arr,comp){
  for(var i = 0; i < arr.length; i+=3){
    insertCustom(arr,comp,i,1,Math.min(arr.length,i+3));
  }
}

// insertion sort with custom increment, initial position and end position
// used for shell sort, merge-insert sort and quick-insert sort
function insertCustom(arr,comp,start,increment,end){
  for(var i = start+increment; i < end; i+=increment){
    for(var k = i; k - increment >= start; k -= increment){
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

// First guess at what Firefox is doing.
// Mostly the same, but with a bounded Insertion sort first and a slight change to the outer for loop
function mergeInsertSort(arr,comp){
  // Run insertion sort first
  boundedInsertionSort(arr,comp);
  
  var a1 = arr;
  var a2 = new Array(arr.length)
  
  // w starts at 3 now because it each every 3 element subarray is already sorted.
  for(var w = 3; w < arr.length; w *= 2){
    for(var lo = 0; lo < arr.length; lo += 2*w){
      var hi = lo + w;
      if (hi >= arr.length) {
          copy(a2, a1, lo, arr.length-1);
          break;
      }
      var top = Math.min(lo + 2*w,arr.length);
      merge(a2, a1, lo, hi, top-1, comp);
    }
    var s = a1;
    a1 = a2;
    a2 = s;
  }
  if(a1 !== arr){
    copy(arr,a1,0,arr.length-1);
  }
}

// Second guess after cheating a bit
// Same as before, but with a different merge function
function mergeInsertSortOpt(arr,comp){
  boundedInsertionSort(arr,comp);
  var a1 = arr;
  var a2 = new Array(arr.length)
  for(var w = 3; w < arr.length; w *= 2){
    for(var lo = 0; lo < arr.length; lo += 2*w){
      var hi = lo + w;
      if (hi >= arr.length) {
          copy(a2, a1, lo, arr.length-1);
          break;
      }
      var top = Math.min(lo + 2*w,arr.length);
      mergeOpt(a2, a1, lo, hi, top-1, comp);
    }
    var s = a1;
    a1 = a2;
    a2 = s;
  }
  if(a1 !== arr){
    copy(arr,a1,0,arr.length-1);
  }
}

// Merge with a small optimization
function mergeOpt(a1,a2,lo,hi,top,comp){
  var j = hi;
  // Check to see if they are already merged
  if(comp(a2[lo],a2[j])>0){
    for(var i = lo; i <= top; i++){
      if(lo >= hi){
        a1[i] = a2[j];
        j++;
      }else if(j > top){
        a1[i] = a2[lo];
        lo++;
      }else{
        if(comp(a2[lo],a2[j])>0){
          a1[i] = a2[j];
          j++;
        }else{
          a1[i] = a2[lo];
          lo++;
        }
      }
    }
  }else{
    // If they are already merged, just copy them
    copy(a1,a2,lo,top);
  }
}


// Todo: include sub-sorts used in analysis

// Chrome Analysis
function quickInsertSort(arr,comp){
  return quickInsertSortRecurse(arr,comp,0,arr.length-1);
}

function quickInsertSortRecurse(arr,comp,lo,hi){
  if(lo + 10 < hi){
    // same as before, but with a new partition
    let pivot = partition2(arr,comp,lo,hi);
    quickInsertSortRecurse(arr,comp,lo,pivot-1);
    quickInsertSortRecurse(arr,comp,pivot+1,hi);
  }else{
    // If the range is <= 10, use insertion sort
    insertCustom(arr,comp,lo,1,hi+1);
  }
}

function partition2(arr,comp,lo,hi){
  var pivot = setupPivot(arr,comp,lo,Math.floor((lo+hi)/2), hi);
  
  //Pretty much the same as before, but with slightly different bounds
  var k = lo+1;
  for(var i = lo+1; i < hi-1;i++){
    if(comp(arr[i],pivot) < 0){
      [arr[i],arr[k]] = [arr[k],arr[i]];
      k++;
    }
  }
  
  // Put the pivot back in the middle
  [arr[hi-1],arr[k]] = [arr[k],pivot];
  return k;
}

function setupPivot(arr,comp,lo,mid,hi){
  // Use the top bottom and middle as potential pivots
  var a = arr[lo];
  var b = arr[mid];
  var c = arr[hi];
  
  // Sort a, b and c
  if(comp(a,b) > 0){
    [a,b]=[b,a]
  }
  if(comp(a,c) >= 0){
    [a,b,c]=[c,a,b];
  }else{
    if (comp(b, c)) {
      [b,c]=[c,b];
    }
  }
  //put the top and bottom values back
  arr[lo] = a;
  arr[hi] = c
  
  // And use the median as the pivot
  [arr[mid],arr[hi-1]] = [arr[hi-1],b];
  
  return b;
}

function quickInsertSort2(arr,comp){
  return quickInsertSort2Recurse(arr,comp,0,arr.length-1);
}

function quickInsertSort2Recurse(arr,comp,lo,hi){
  if(lo + 10 < hi){
    let [a,b] = partition3(arr,comp,lo,hi);
    quickInsertSort2Recurse(arr,comp,lo,a-1);
    quickInsertSort2Recurse(arr,comp,b+1,hi);
  }else{
    insertCustom(arr,comp,lo,1,hi+1);
  }
}

function partition3(arr,comp,lo,hi){
  var pivot = setupPivot(arr,comp,lo,Math.floor((lo+hi)/2), hi);
  
  var eqlo = lo+1, eqhi = hi-1;
  for(let i = lo+2; i <= eqhi;i++){
    var c = comp(arr[i],pivot);
    if(c < 0){
      // move arr[i] below the equal range
      let t = arr[eqlo];
      arr[eqlo] = arr[i];
      arr[i] = t;
      eqlo++;
    }else if(c > 0){
      // move arr[i] above the equal range
      let t = arr[eqhi];
      arr[eqhi] = arr[i];
      arr[i] = t;
      eqhi--;
      i--; //the value at arr[i] has not yet been processed so stall the loop
    } // if c === 0, do nothing, it is in the right place
  }
  // state of sub array:
  //  [lo,eqlo) is less than pivot
  //  [eqlo,eqhi] is equal to pivot
  //  (eqhi,hi) is greater than pivot
  return [eqlo,eqhi];
}















// Extra Sorting Algorithms
// Unused in the main article, but implemented.

function shellSort(arr,comp){
  var h = 1;
  for(; h < arr.length; h = 3*h+1);
  for(; h > 0; h = Math.floor(h / 3)){
    for(var i = 0; i < h; i ++){
      insertCustom(arr,comp,i,h,arr.length);
    }
  }
}

// Top Down implementation of merge sort
// Included for reference
function mergeSortTopDown(arr,comp){
  return mergeSortRecurse(arr,comp,0,arr.length-1);
}

function mergeSortRecurse(arr,comp,start,end){
  if(start >= end){
    return;
  }
  var a = Math.floor(end/2+start/2);
  mergeSortRecurse(arr,comp,start,a);
  mergeSortRecurse(arr,comp,a+1,end);

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