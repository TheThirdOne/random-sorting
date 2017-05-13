importScripts('sorts.js','helper.js','main.js');

onmessage = function(e){
  console.log("Recieved: ", e.data.sort + "-" + e.data.length);
  var h = hist2(e.data.length,sorts[e.data.sort]);
  console.log("Finished: ", e.data.sort + "-" + e.data.length);
  postMessage(h);
}