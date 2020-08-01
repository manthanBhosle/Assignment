conso = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]

vowels = ["a", "e", "i", "o", "u"]

def binarySearch(data, pattern):
    l = len(data)
    p = len(pattern)

    bi = ""
    for i in data:
        if i in conso:
            bi += "1"
        elif i in  vowels:
            bi += "0"

    count = 0
    
    x = []

    for i in range((l-p) + 1, 0, -1):
        powSet = ""
        for j in bi[i-1: i+2]:
            powSet += j
        x.append(powSet)

    for i in x:
        if pattern == i :
            count += 1

    print(count)
    
binarySearch("heroku", "010")