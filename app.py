from flask import Flask 
from flask import jsonify
from flask import *
import base64
import requests 
import sqlite3 as db 
from PIL import Image
import io
from flask_cors import CORS, cross_origin

app = Flask(__name__) #creating the Flask class object   
CORS(app)
conn = db.connect('data.db' , check_same_thread=False)

  
@app.route('/data')
def success():
    cur = conn.cursor()
    cur.execute("SELECT * from properties")
    raw_data = cur.fetchall();
    base64EncodedStr = base64.b64encode(raw_data[2][6])
    #return jsonify(base64EncodedStr.decode('utf-8'))
    return jsonify(get_final_data(raw_data))

def get_final_data(raw_data):
    i,j = 0 , 0
    w, h = 8, len(raw_data)
    final_data = [[0 for x in range(w)] for y in range(h)]
    while i < len(raw_data):
        j=0
        while j < 8:
            if j == 6:
                final_data[i][j] =  base64.b64encode(raw_data[i][j]).decode('utf-8')
            else:
                final_data[i][j] = raw_data[i][j]
            j+=1;
        i+=1;

    return final_data

@app.route('/City/<city>')
def get_by_city(city):
    cur = conn.cursor()
    c = city[1:-1]
    print("SELECT * from properties where city='"+c+"';")
    cur.execute("SELECT * from properties where city='"+c+"';")
    data = cur.fetchall()
    print(type(data))
    return jsonify(get_final_data(data))

if __name__ =='__main__':  
    app.run(debug = True)
