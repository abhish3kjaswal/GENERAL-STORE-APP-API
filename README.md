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
# Work Flow
step 1 : created two models one for user and one for vendor in mongoDB

step 2 : registered user with username and password ,password is encrypted using bcryptjs and then saved the username and password into the user model in mongoDB.if the user is already registered it will give a json message of user already exists

step 3 : registered vendor with mobileno and password ,password is encrypted using bcryptjs and then the mobile and password is saved into the vendor model mongoDB.if the vendor is already registered it will give a json message of vendor already exists

step 4:  generated a jsonwebtoken with payload as user.id for user and vendor.id for vendor

step 5: user can login with its registered username and password as soon as the user logged in a token is generated which can be used in future for that specific user inorder to authenticate the specific user.if any of the credentials are not matched then it will show the json message as invalid credentials

step 6: same is done for the vendor

step 7: vendor list can be accessed by the vendor through the token as soon as the vendor logs in 
