import requests
import inquirer
from bs4 import BeautifulSoup
import platform
import sys

# rest_url = 'https://calculator.adamlass.com'
rest_url = 'http://localhost:3020'
soap_url = 'http://www.dneonline.com/calculator.asmx'

service_options = [
    inquirer.List('service',
                  message='Select Web Service?',
                  choices=['REST', 'SOAP', 'EXIT'],
                  ),
]

soap_options = [
    inquirer.List('operator',
                  message='Select Operator?',
                  choices=['Add', 'Subtract', 'Multiply', 'Divide'],
                  ),
]

rest_options = [
    inquirer.List('operator',
                  message='Select Operator?',
                  choices=['Add', 'Subtract',
                           'Multiply', 'Divide', 'Favorite'],
                  ),
]

method_options = [
    inquirer.List('method',
                  message='Select HTTP method?',
                  choices=['GET', 'POST', 'PUT', 'DELETE'],
                  ),
]


def run():
    print(f'System platform {getOS()}')

    service_selection = inquirer.prompt(service_options)
    service = service_selection['service']

    if service == 'REST':
        operator_selection = inquirer.prompt(rest_options)
        operator = operator_selection['operator']

        if operator == 'Favorite':
            method_selection = inquirer.prompt(method_options)
            method = method_selection['method']

            if method in ['POST', 'PUT']:
                value = input('new favorite number: ')
                result = rest_client_favorite(method, value)

            else:
                result = rest_client_favorite(method)

        else:
            value_a, value_b = get_values()
            result = rest_client(operator, value_a, value_b)

    elif service == 'SOAP':
        operator_selection = inquirer.prompt(soap_options)
        operator = operator_selection['operator']

        value_a, value_b = get_values()
        result = soap_client(operator, value_a, value_b)

    else:
        sys.exit()

    print(f'{operator} result::', result)


def get_values():
    value_a = input('first value: ')
    value_b = input('second value: ')
    print()
    return value_a, value_b


def rest_client(operation, value_a, value_b):
    response = requests.post(f'{rest_url}/{operation.lower()}',
                             json={"value_a": int(value_a), "value_b": int(value_b)})
    # print(response.json()['links'])
    result = response.json()['result']
    return result


def rest_client_favorite(method, value=None):
    if method == 'POST':
        response = requests.post(
            f'{rest_url}/favorite', json={"value": int(value)})
    elif method == 'PUT':
        response = requests.put(
            f'{rest_url}/favorite', json={"value": int(value)})
    elif method == 'DELETE':
        response = requests.delete(f'{rest_url}/favorite')
    else:
        response = requests.get(f'{rest_url}/favorite')

    # print(response.json()['links'])
    result = response.json()['result']
    return result


def soap_client(operation, value_a, value_b):
    headers = {'content-type': 'text/xml; charset=utf-8'}
    body = f'''<?xml version='1.0' encoding='utf-8'?>
    <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
    <soap:Body>
        <{operation} xmlns='http://tempuri.org/'>
        <intA>{value_a}</intA>
        <intB>{value_b}</intB>
        </{operation}>
    </soap:Body>
    </soap:Envelope>'''

    response = requests.post(soap_url, data=body, headers=headers)
    soup = BeautifulSoup(response.content, features='lxml')

    result = int(soup.find(f'{operation.lower()}result').string)
    return result


def getOS():
    system = platform.system().lower()

    if (system == 'linux'):
        os = 'linux'
    elif (system == 'darwin'):
        os = 'MacOS'
    else:
        print('Unsupported OS - Closing Program')
        sys.exit()

    return os


if __name__ == '__main__':
    while True:
        run()
