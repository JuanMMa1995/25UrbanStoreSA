# transbank_utils.py
import requests
from django.conf import settings

def header_request_transbank():
    return {
        "Authorization": "Token",
        "Tbk-Api-Key-Id": settings.TRANSBANK_API_KEY_ID,
        "Tbk-Api-Key-Secret": settings.TRANSBANK_API_KEY_SECRET,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Referrer-Policy': 'origin-when-cross-origin',
    }

def transbank_create(data):
    url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions"
    headers = header_request_transbank()
    response = requests.post(url, json=data, headers=headers)
    return response

def transbank_commit(tokenws):
    url = f"https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/{tokenws}"
    headers = header_request_transbank()
    response = requests.put(url, headers=headers)
    return response

def transbank_reverse_or_cancel(tokenws, amount):
    data = {"amount": amount}
    url = f"https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/{tokenws}/refunds"
    headers = header_request_transbank()
    response = requests.post(url, json=data, headers=headers)
    return response