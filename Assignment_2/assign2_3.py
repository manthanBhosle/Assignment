s = "Peter Piper picked a peck of pickled peppers A peck of pickled peppers Peter Piper picked"
print(s)
d = dict()

a = s.lower()
words = a.split(" ")

print(words)

for word in words:
    if word in d:
        d[word] = d[word] + 1
    else:
        d[word] = 1

print(d)