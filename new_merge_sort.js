function mergeSort(array) {
  const half = array.length / 2
  
  // Base case or terminating case
  if(array.length < 2){
    return array 
  }
  
  const left = array.splice(0, half)
  return merge(mergeSort(left),mergeSort(array))
}

function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays
        console.log("left = ", left, "right = ", right)
        if (result === "1") {
            arr.push(left.shift()) 
            
        } else if (result === "2"){
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}


var array = ['song 1', 'song2', 'song3', 'song4', 'song5', 'song6', 'song7'];
console.log(mergeSort(array));