# coding: utf-8
from google.cloud import storage
import json

client = storage.Client()
bucket_name = 'shogiban_img'
bucket = client.get_bucket(bucket_name)

def getkif(gameid, tesu):
    blob = bucket.blob(gameid+"/movement.json")
    kifs = "{\"kifs\":[" + blob.download_as_string().decode('utf-8') + "]}"
    kifsdict = json.loads(kifs)
    if tesu != 0:
        kifslist = kifsdict["kifs"]
        del kifslist[:tesu]
        kifsdict["kifs"] = kifslist
    return kifsdict
