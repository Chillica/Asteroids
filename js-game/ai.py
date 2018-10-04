import socket
import sys
import json

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

// Sys.argv is the port and it is accepting port from command
sock.connect(("127.0.0.1", int(sys.argv[1])))

command = {"shoot": True,
           "accel": True,
           "left": False,
           "right": False}

while(True):
    sock.send(json.dumps(command))
    msg = sock.recv(1000)
