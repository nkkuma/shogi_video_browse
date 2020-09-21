# coding: utf-8
from google.cloud import storage
import json

client = storage.Client(project=credentials.project_id)
bucket_name = 'shogiban_img'
bucket = client.get_bucket(bucket_name)

def getkif(gameid, tesu):
    blob = bucket.blob(gameid+"/movement.json")
    kifs = blob.download_as_string().decode('utf-8').split(",")
    return {"kifs": kifs}
