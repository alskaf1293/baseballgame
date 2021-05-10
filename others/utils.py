def returnCounts(possibilities):
    final = [{} for _ in range(len(possibilities[0]))]
    for x in possibilities:
        for y in range(len(x)):
            try:
                final[y][x[y]] += 1
            except:
                final[y][x[y]] = 1
    return final

def addzeros(num, digits):
    num = str(num)
    while len(num) < digits:
        num = "0" + num
    return num 

def query(true,guess):
    true = list(true); guess = list(guess)
    dic = {"S": 0, "B": 0}
    gcopy = guess.copy()
    for x in true:
        for y in gcopy:
            if x == y:
                dic["B"] += 1
                gcopy.remove(y)
                break
    for x in range(len(guess)):
        if true[x] == guess[x]:
            dic["S"] += 1
    dic["B"] -= dic["S"]
    return dic

def nextGuess(counts, possibilities):
    min = float("inf")
    nextGuess = None
    for x in possibilities:
        sum = 0
        for y in range(len(x)):
            sum += counts[y][x[y]]
        
        if sum < min:
            min = sum
            nextGuess = x
    return nextGuess
    
def getNextGuessFromPrevious(possibilities, guess, result):
    nextPossibilities = []
    for x in possibilities:
        #compare it to guess and see if it yields result
        #if does, then append to nextPossibilities
        bruh = query(guess,x)
        if bruh == result:
            nextPossibilities.append(x)
    counts = returnCounts(nextPossibilities)
    return nextGuess(counts, nextPossibilities) , nextPossibilities