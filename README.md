# rest-api-express-mongo

HOST: 'http://localhost:3001';

# AUTH

## Register

```javascript
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