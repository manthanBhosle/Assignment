class Student:
    def __init__(self, row, header):
        self.__dict__ = dict(zip(header, row))