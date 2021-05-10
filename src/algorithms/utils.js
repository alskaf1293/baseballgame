export function objectEquals(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
  
    return true;
  }

export function addzeros(num, digits){
    let thing = num.toString()
    while(thing.length<digits){
        thing = "0" + thing
    }
    return thing
}
export function returnCounts(possibilities){
    var final = []
    for(let i=0; i<possibilities[0].length; i++){
       final.push({})
    }
    for(let i=0; i<possibilities.length; i++){
        for(let y=0; y<possibilities[0].length; y++){
            if(final[y].hasOwnProperty(possibilities[i][y])){
                final[y][possibilities[i][y]] += 1
            }else{
                final[y][possibilities[i][y]] = 1
            }
        }
    }
    return final
}
export function query(truth, guess){
    let dic = {"S":0, "B":0}
    let gcopy = [];
    for(let i=0; i<guess.length;i++){
        gcopy.push(guess[i])
    }
    for(let i=0; i< truth.length; i++){
        for(let j=0; j<gcopy.length; j++){
            if(truth[i]===gcopy[j]){
                dic["B"] += 1
                const index = gcopy.indexOf(gcopy[j])
                gcopy.splice(index,1)
                break;
            }
        }
    }
    for(let i=0; i< guess.length; i++){
        if(truth[i]===guess[i]){
            dic["S"] += 1
        }
    }
    dic["B"] -= dic["S"]
    return dic
}
export function nextGuess(counts, possibilities){
    let min = Infinity
    let nexGuess = null
    for(let i=0; i<possibilities.length;i++){
        let x = possibilities[i]
        let sum = 0
        for(let j=0; j<x.length;j++){
            sum += counts[j][x[j]]
        }
        if(sum<min){
            min=sum
            nexGuess = x
        }
    }
    return nexGuess
}
export function getNextGuessFromPrevious(possibilities, guess, result){
    let nextPossibilities = []
    for(let i=0; i<possibilities.length;i++){
        let x = possibilities[i]
        let bruh = query(guess,x)
        if(objectEquals(bruh,result)){
            nextPossibilities.push(x)
        }
    }
    let counts = returnCounts(nextPossibilities)
    return [nextGuess(counts, nextPossibilities),nextPossibilities]
}

function main(){
    let digits = 4
    let truth = "1234"

    let possibilities = []
    for(let i=0; i<10000;i++){
        possibilities.push(addzeros(i,digits))
    }
    let guess = "1004"
    let result = query(truth, guess)
    while(guess !== truth){
        let arr = getNextGuessFromPrevious(possibilities, guess, result)
        guess = arr[0]
        possibilities = arr[1]
        result = query(truth, arr[0])
    }
}

main()
