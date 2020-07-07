# GENERAL-STORE-APP-API(MongoDB, ExpressJS, NodeJs)
● Authentication and Registration API for customer and shopkeeper
● Choose the registration field accordingly for both customer and shopkeeper 

1. Login API for User
URL: localhost/user/login
Method: POST
Body:
Username: “example_name”
Password: “***********”
RESPONSE (200 OK)
Status 1 for success login
Status 2 for invalid credentials

2. Login API for Shopkeeper
URL: localhost/vendor/login
Method: POST
Body:
mobile: 9128733298
Password: “***********”
RESPONSE (200 OK)
Status 1 for success login
Status 2 for invalid credentials

3. & 4. Similarly create the registration API

5. Products list for the shopkeeper
URL: localhost/vendor/list
Method: GET
BODY: __EMPTY__
RESPONSE (200 OK)
Status 1 for success
BODY:
{
‘Status’ :1 ,
‘Items’ : [
{
‘Title’ : ‘some title’
‘Description’: ‘some Description’
‘Price’: 123
},
{
‘Title’ : ‘some title’
‘Description’: ‘some Description’
‘Price’: 123
},
{
‘Title’ : ‘some title’
‘Description’: ‘some Description’
‘Price’: 123
}
.
.
.
]
}
Status 2 for failure (in some case)
