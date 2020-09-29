import requests
import inquirer
from bs4 import BeautifulSoup

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
    return ""


def soap_client(operation, value_a, value_b):
    url = 'http://www.dneonline.com/calculator.asmx'

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

    response = requests.post(url, data=body, headers=headers)
    soup = BeautifulSoup(response.content, features='lxml')

    result = int(soup.find(f'{operation.lower()}result').string)
    return result


if __name__ == '__main__':
    run()
