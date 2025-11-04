# PayU BLIK integration sketch for CryptoBLIK
# This is a helper module for handling PayU BLIK payments in Flask backend.
# Fill in your credentials and endpoints as needed.

import requests
import uuid
import time

PAYU_CLIENT_ID = 'YOUR_CLIENT_ID'
PAYU_CLIENT_SECRET = 'YOUR_CLIENT_SECRET'
PAYU_POS_ID = 'YOUR_POS_ID'
PAYU_SECOND_KEY = 'YOUR_SECOND_KEY'
PAYU_API_URL = 'https://secure.snd.payu.com'  # Sandbox endpoint


def get_payu_access_token():
    resp = requests.post(
        f'{PAYU_API_URL}/pl/standard/user/oauth/authorize',
        data={'grant_type': 'client_credentials'},
        auth=(PAYU_CLIENT_ID, PAYU_CLIENT_SECRET)
    )
    resp.raise_for_status()
    return resp.json()['access_token']


def create_blik_order(amount_pln, email, blik_code, description='BLIK payment'):
    access_token = get_payu_access_token()
    order_id = str(uuid.uuid4())
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'
    }
    data = {
        "notifyUrl": "https://yourdomain.pl/api/payu/notify",
        "customerIp": "127.0.0.1",
        "merchantPosId": PAYU_POS_ID,
        "description": description,
        "currencyCode": "PLN",
        "totalAmount": str(int(amount_pln * 100)),
        "extOrderId": order_id,
        "buyer": {
            "email": email
        },
        "payMethods": {
            "payMethod": {
                "type": "BLIK_TOKEN",
                "value": blik_code
            }
        }
    }
    resp = requests.post(f'{PAYU_API_URL}/api/v2_1/orders', json=data, headers=headers)
    return resp.json()

# Example usage:
# result = create_blik_order(10.0, 'test@example.com', '123456')
# print(result)
