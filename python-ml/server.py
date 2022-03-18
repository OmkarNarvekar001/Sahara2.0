def model(arr):
    import numpy as np
    import matplotlib.pyplot as plt
    import pandas as pd
    import pickle
    dataset = pd.read_csv('./test_data.csv')
    x = dataset.iloc[:, 1:-1].values
    y = dataset.iloc[:, -1].values
    from sklearn.model_selection import train_test_split
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.20, random_state = 0)
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    x_train = sc.fit_transform(x_train)
    x_test = sc.transform(x_test)
    with open('score','rb') as f:
        regressor=pickle.load(f) 
    res = regressor.predict(sc.transform(arr))
    return res


from http.server import HTTPServer, BaseHTTPRequestHandler
from http import HTTPStatus
import json
import cgi

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
    def do_HEAD(self):
        self._set_headers()
        
    
    def do_GET(self):
        from ast import literal_eval
        self._set_headers()
        response = json.dumps({'data':model(literal_eval(self.path[1:])).tolist()})
        response = bytes(response, 'utf-8')
        self.wfile.write(response)
        
    # POST echoes the message adding a JSON field
    def do_POST(self):
        ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
        
        # refuse to receive non-json content
        if ctype != 'application/json':
            self.send_response(400)
            self.end_headers()
            return
            
        # read the message and convert it into a python dictionary
        length = int(self.headers.getheader('content-length'))
        message = json.loads(self.rfile.read(length))
        
        # add a property to the object, just to mess with data
        message['received'] = 'ok'
        
        # send the message back
        self._set_headers()
        self.wfile.write(json.dumps(message))
        
def run(server_class=HTTPServer, handler_class=Server, port=8008):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    
    print('Starting httpd on port %d...' % port)
    httpd.serve_forever()
    
if __name__ == "__main__":
    from sys import argv
    
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()