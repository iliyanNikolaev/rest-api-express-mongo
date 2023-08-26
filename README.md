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
// when you add accessToken from response in your request headers like that key: 'X-Authorization', value: accessToken, you can to send authenticated requests 
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
// when you add accessToken from response in your request headers like that key: 'X-Authorization', value: accessToken you can to send authenticated requests
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


### USERS

```javascript
>>> Get User By Id <<<

fetch('http://localhost:3001/api/users/:id');

Success response: 200 OK {"_id": "...", "username": "...", "profilePicture": "...", "coverPicture": "...", "followers": [...], "following": [...]}
```

```javascript
>>> Edit User By Id <<<

//You can edit only your profile, must be authenticated with valid accessToken in request headers
//With this request you can edit this props: username, profilePicture, coverPicture, description

fetch('http://localhost:3001/api/users/:id', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'here is your accessToken'
    },
    body: JSON.stringify({
        username: 'some username',
        profilePicture: '//TODO...',
        coverPicture: '//TODO...',
        description: 'some description'
    });
});

Success response: 200 OK { "username": "...", "profilePicture": "...", "coverPicture": "...", "description": "..." } 
```

```javascript
>>> Delete User By Id <<<

//You can delete only your profile, must be authenticated with valid accessToken in request headers
//With this request you delete your profile permanently

fetch('http://localhost:3001/api/users/:id', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'here is your accessToken'
    }
});

Success response: 204 No Content 
```