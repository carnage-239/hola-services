# Profile Route Docs

1. POST http://localhost:5000/dev/user


```json
{
    "name": "Pranjal Walia",
    "email": "pranjal@email.com",
    "mobileNumber": "9999999999",
    "countryCode": "+91",
    "password": "P@ssword1"
}
```

2. POST http://localhost:5000/dev/login


```json
{
    "email": "pranjal@email.com",
    "password": "P@ssword1"
}
```

3. Invocation: 

  POST - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/user
  POST - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/users/login

