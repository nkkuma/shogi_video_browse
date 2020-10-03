# coding: utf-8
import re
gameid_regex = re.compile(r'([0-9]{4})-([0-9]{2})-([0-9]{2})_([0-9]{6})')

def validate_gameid(gameid):
    return gameid_regex.fullmatch(gameid)