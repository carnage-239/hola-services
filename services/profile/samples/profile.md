# Profile Route Docs

1. POST http://localhost:5000/dev/user

```json
{
  "name": "Pranjal Walia",
  "email": "pranjal@email.com",
  "mobileNumber": "9999999999",
  "countryCode": "+91",
  "password": "P@ssword1",
  "user_type": "guide"
}
```

2. POST http://localhost:5000/dev/login

```json
{
  "email": "pranjal@email.com",
  "password": "P@ssword1"
}
```

```json
{
  "mobileNumber": "+919999999999",
  "password": "P@ssword1"
}
```

3. POST: http://localhost:5000/dev/user/refresh-tokens

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaFRva2VuIiwidXNlciI6eyJpZCI6InVzZXItNzU0MDA4N2YtNGU2Zi00YjA2LWI0ZTMtNjkwZWRiMTU0NjkzIiwiZW1haWwiOiJwcmFuamFsQGVtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6Iis5MTk5OTk5OTk5OTkiLCJpc0FjdGl2ZSI6dHJ1ZSwiand0VmVyc2lvbiI6MSwidXNlcl90eXBlIjoiZ3VpZGUifSwiaWF0IjoxNjI3MzMyNDIzLCJleHAiOjE2Mjk5MjQ0MjMsImlzcyI6IkhvbGEifQ.ntJPjOvALSbkPKtr8Q2BT2UwDhp2DS0Ppif3mXOML_g"
}
```

4. GET: http://localhost:5000/dev/user/token-info

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzVG9rZW4iLCJ1c2VyIjp7ImlkIjoidXNlci1iYzBjYjE2Yy00YmViLTQ3ZWMtYjgwMS01ZDg5OWU5MTYxNjYiLCJlbWFpbCI6InByYW5qYWxAZW1haWwuY29tIiwibW9iaWxlTnVtYmVyIjoiOTk5OTk5OTk5OSIsImlzQWN0aXZlIjp0cnVlLCJqd3RWZXJzaW9uIjoxfSwiaWF0IjoxNjI3NDY4Mzk5LCJleHAiOjE2MzAwNjAzOTksImlzcyI6IkhvbGEifQ.3ZH11J9Bz5X2y1RdW32G9wiRsgP5xxFhD5QCERjW6Xk"
}
```

5. Invocation:

POST - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/user
POST - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/users/login
POST - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/user/refresh-tokens
GET - https://8vdrjb6gkc.execute-api.ap-south-1.amazonaws.com/dev/user/token-info
