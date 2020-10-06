import requests
import inquirer
from bs4 import BeautifulSoup
import platform


# rest_url = 'https://calculator.adamlass.com'
rest_url = 'http://localhost:3020'
soap_url = 'http://www.dneonline.com/calculator.asmx'

options = [
    inquirer.List('service',
                  message='Select Web Service?',
                  choices=['REST', 'SOAP'],
                  ),
    inquirer.List('operator',
                  message='Select Operator?',
                  choices=['Add', 'Subtract', 'Multiply', 'Divide'],
                  ),
]


def run():
    print(f'System platform {getOS()}')

    selections = inquirer.prompt(options)
    service = selections['service']
    operation = selections['operator']

    value_a = input('first value: ')
    value_b = input('second value: ')
    print()

    if service == 'REST':
        result = rest_client(operation, value_a, value_b)
    else:
        result = soap_client(operation, value_a, value_b)

    print(f'{operation} result::', result)


def rest_client(operation, value_a, value_b):
    response = requests.post(f'{rest_url}/{operation.lower()}', json={"value_a": int(value_a), "value_b": int(value_b)})
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
    elif (system in ['win32', 'win64']):
        os = 'Windows'
    else:
        raise Exception('Unsupported OS - Closing Program')

    return os


if __name__ == '__main__':
    run()
