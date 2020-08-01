cs_dept = {1001,1002,1005,1008,1010}
is_dept = {1010,1002,1005,1015,1020}
ec_dept = {1002,1005,1015,1010,1003}

u = cs_dept.union(is_dept, ec_dept)
print(u)

# a.
print(cs_dept.intersection(is_dept, ec_dept))

# b.
print(len(cs_dept.union(is_dept, ec_dept)))

#c.
a = cs_dept.union(is_dept)
b = a.intersection(ec_dept)

print(a - b)