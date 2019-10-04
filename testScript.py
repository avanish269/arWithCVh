import fileinput
import sys
import base64
from PIL import Image
import numpy as np
from io import BytesIO

data=""

for line in fileinput.input():
    data +=line

data=data[22:]
b=base64.b64decode(data)
bio=BytesIO(b)
im=Image.open(bio).convert('RGB')
np_im=np.array(im)
result=str(np_im.shape[0])
result+=", "
result+=str(np_im.shape[1])
result+=", "
result+=str(np_im.shape[2])
result+=", "
result+=str(np_im[0, 0, 0])
sys.stdout.write(result)
sys.stdout.flush()
