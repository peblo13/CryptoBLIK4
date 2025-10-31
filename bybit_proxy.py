import os
from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

BYBIT_API_KEY = os.environ.get('BYBIT_API_KEY', 'TUTAJ_WSTAW_SWÓJ_KLUCZ_API')
BYBIT_API_SECRET = os.environ.get('BYBIT_API_SECRET', 'TUTAJ_WSTAW_SWÓJ_SECRET')

@app.route('/api/bybit-prices')
def bybit_prices():
    url = 'https://api.bybit.com/v5/market/tickers?category=spot'
    headers = {
        'Accept': 'application/json',
        'X-BAPI-API-KEY': BYBIT_API_KEY
    }
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        return jsonify(resp.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
