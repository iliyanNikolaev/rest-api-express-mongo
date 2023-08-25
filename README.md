# rest-api-express-mongo

HOST: http://localhost:3001

### AUTH

```javascript
>>> REGISTER <<<

fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'some username',
        password: 'some password'
    })
});

Success response: 200 OK, {"_id": "...", "username": "...","accessToken": "..."}
// when you add accessToken from response in your request headers, you can to send authenticated requests 
```

```javascript
>>> LOGIN <<<

fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'some username',
        password: 'some password'
    })
});

Success response: 200 OK {"_id": "...", "username": "...","accessToken": "..."}
// when you add accessToken from response in your request headers, you can to send authenticated requests
```

```javascript
>>> LOGOUT <<<

fetch('http://localhost:3001/api/auth/logout', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'here is your accessToken'
    }
});

Success response: 204 No Content
// after this request your current ассеssТoken becomes invalid
```