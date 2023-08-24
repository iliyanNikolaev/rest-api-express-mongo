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

response: {"_id": "...", "username": "...","accessToken": "..."} 
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

response: {"_id": "...", "username": "...","accessToken": "..."}
```