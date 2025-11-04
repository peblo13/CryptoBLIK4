#!/usr/bin/env python3
"""Test script for CryptoBLIK API endpoints"""

from app import create_app

def test_endpoints():
    app = create_app()

    with app.test_client() as client:
        # Test health endpoint
        print("Testing /health endpoint:")
        response = client.get('/health')
        print(f"Status: {response.status_code}")
        print(f"Response: {response.get_json()}")
        print()

        # Test market price endpoint
        print("Testing /api/market-price/BTCUSDT endpoint:")
        response = client.get('/api/market-price/BTCUSDT')
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.get_json()
            print(f"Symbol: {data.get('symbol')}")
            print(f"Price: {data.get('price')}")
        else:
            print(f"Error: {response.get_json()}")
        print()

        # Test crypto buy endpoint (POST)
        print("Testing /api/crypto/buy endpoint (POST):")
        test_data = {
            'amount': 100,
            'crypto': 'BTC',
            'wallet': 'test_wallet',
            'blik_code': '123456',
            'email': 'test@example.com'
        }
        response = client.post('/api/crypto/buy', json=test_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.get_json()}")
        print()

        # Test BLIK payment endpoint (POST)
        print("Testing /api/payment/blik endpoint (POST):")
        blik_data = {
            'blik_code': '123456',
            'amount': 100,
            'email': 'test@example.com'
        }
        response = client.post('/api/payment/blik', json=blik_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.get_json()}")

if __name__ == '__main__':
    test_endpoints()