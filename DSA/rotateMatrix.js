function* iterator(list) {
  for (_ of list) {
    yield _
  }
  return {value: undefined, done: true}
}

function rotate(matrix, k) {
  const height = matrix.length;
  const out = [];
  for(let z = 0;z<height;z++){
    out.push([])
  }
  const acc = [];
  const numberOfLoops = Math.ceil(height / 2);
  // Build individual loops, that need to be rotated
  for (let i = 0; i < numberOfLoops; i++) {
    const vLimit = height - i - 1;
    const hLimit = height - i - 1;
    const loop = [];
    for (let j = i; j <= hLimit; j++) {
      loop.push(matrix[i][j])
    }
    for (let k = i + 1; k <= vLimit; k++) {
      loop.push(matrix[k][hLimit])
    }
    for (let l = hLimit - 1; l >= i; l--) {
      loop.push(matrix[vLimit][l])
    }
    for (let m = hLimit - 1; m > i; m--) {
      loop.push(matrix[m][i])
    }
    acc.push(loop)
  }

  // rotate loops
  for (let loop of acc) {
    let counter = k % loop.length;
    while (counter > 0) {
      loop.unshift(loop.pop())
      counter--;
    }
  }

  // build new matrix
  for (let n = 0; n < numberOfLoops; n++) {
    const loopIterator = iterator(acc[n])
    const hLimit = height - n - 1;
    const vLimit = height - n - 1;
    for (let i = n; i <= hLimit; i++) {
      out[n][i] = loopIterator.next().value
    }
    for (let k = n + 1; k <= vLimit; k++) {
      out[k][hLimit] = loopIterator.next().value
    }
    for (let l = hLimit - 1; l >= n; l--) {
      out[vLimit][l] = loopIterator.next().value
    }
    for (let m = vLimit - 1; m > n; m--) {
      out[m][n] = loopIterator.next().value
    }
  }
  return out
}


const m3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const m4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]
const m5 = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
]
const m6 = [
  [1, 2, 3, 4, 5, 6,],
  [7, 8, 9, 10, 11, 12,],
  [13, 14, 15, 16, 17, 18,],
  [19, 20, 21, 22, 23, 24,],
  [25, 26, 27, 28, 29, 30,],
  [31, 32, 33, 34, 35, 36,]
]

const input = m6
const rotationIndex = 1
console.table(input)
console.log(`Rotated by ${rotationIndex} units to form below structure`)
console.table(rotate(input, rotationIndex));
