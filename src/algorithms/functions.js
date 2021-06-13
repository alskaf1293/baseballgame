export function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min).toString();
} 

export function getNumbersWithDifferentDigits(noDigits){
    let digits = [0,1,2,3,4,5,6,7,8,9]
    let num = ""
    let randoIndex = 0
    let randoNo = 0
    for(let i=0; i<noDigits; i++){
        randoIndex = randomNumber(0,digits.length)
        randoNo = digits[randoIndex]
        num = num + randoNo.toString()
        digits.splice(randoIndex,1)
    }
    return num
}