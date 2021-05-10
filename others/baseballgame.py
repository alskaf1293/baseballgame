from utils import *

digits = 4
true = "1045"

possibilities = [addzeros(x, digits) for x in range(0,10000)]
guess = "1234"
result = query(true, guess)

while guess != true:
    guess, possibilities = getNextGuessFromPrevious(possibilities, guess, result)
    result = query(true, guess)