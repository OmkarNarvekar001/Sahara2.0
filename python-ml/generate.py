import pandas as pd
import numpy as np
from csv import writer
import random

#likes, followers, followings, donations, posts, score
with open('test_data.csv', 'a',newline="") as f_object:
    for i in range(10000):
        likes=random.randint(1,3000)
        followers=random.randint(1,500)
        followings=random.randint(1,100)
        donations=random.randint(1,20)
        posts=random.randint(1,30)
        score=0
        if followers in range(0,100) and likes in range(0,600):    
            score=1
        elif followers in range(100,200) and likes in range(600,1200):
            score=2
        elif followers in range(200,300) and likes in range(1200,1800):
            score=3
        elif followers in range(300,400) and likes in range(1800,2400):
            score=4
        elif followers in range(400,500) and likes in range(2400,3000):
            score=5
        else:
            score=random.randint(1,5)

        List=[i,likes,followers,followings,donations,posts,score]
        writer_object = writer(f_object)
        writer_object.writerow(List)
    f_object.close()

