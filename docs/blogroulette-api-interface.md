# Blogroulette Api Interface

## User

#### Login
```
ENDPOINT: Login
POST{
  username: string,
  password: string,
}
RESPONSE{
  username: string,
  token: string,
}
```

#### Logout:Authenticated
```
ENDPOINT: Logout
POST{}
RESPONSE{
  status: string,
  error?: string,
}
```

#### Register
```
ENDPOINT: Register
POST{
  invitetoken: string,
  username: string,
  password: string,
}
RESPONSE{
  username: string,
  token: string,
}
```

### All Authenticated Requests use a JWT in the Authentication-Header-Field. (Maybe we could just do a Bearer token.)

## Settings

#### LoadSettings:Authenticated
```
ENDPOINT: LoadSettings
POST{}
RESPONSE{
  username: string,
}
```

#### SaveSettings:Authenticated
```
ENDPOINT: SaveSettings
POST{
  username: string,
  password: string,
  newpassword: string,
}
RESPONSE{
  status: string,
  error?: string,
}
```

## Roulette

#### getMessage
```
ENDPOINT: GetRandomMessage
POST{messageid?: string}
RESPONSE{
  messageid: string,
  timestamp: RFC3339(2004-06-14T23:34:30Z),
  title: string,
  text: string,
  votes: number,
  comments: [
    {
      commentid: string,
      timestamp: RFC3339(2004-06-14T23:34:30Z),
      text: string,
      votes: number,
    }
  ]
}
```

#### addMessage:Authenticated
```
ENDPOINT: AddMessage
POST{
  title: string,
  text: string,
}
RESPONSE{
  status: string,
  error?: string,
}
```

#### voteMessage:Authenticated
```
ENDPOINT: VoteMessage
POST{
  messageid: string,
  vote: up|down
}
RESPONSE{
  status: string,
  error?: string,
}
```

#### addComment:Authenticated
```
ENDPOINT: AddComment
POST{
  messageid: string,
  text: string,
}
RESPONSE{
  status: string,
  error?: string,
}
```

#### voteComment:Authenticated
```
ENDPOINT: VoteComment
POST{
  commentid: string;
  messageid: string,
  vote: up|down
}
RESPONSE{
  status: string,
  error?: string,
}
```
