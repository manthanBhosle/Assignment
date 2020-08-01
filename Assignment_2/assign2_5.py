num = int (input("Enter a number:\n"))

sum = 0
mul = 1

while num != 0:
    sum += num % 10

    if num % 10 == 0:
        mul *= 1
    else:
        mul *= (num % 10)
    
    num = num // 10

print(sum) 
print(mul)