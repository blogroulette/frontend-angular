# Blogroulette Api Interface

## User

#### Login
```
POST{
  username: string,
  password: string,
}
RESPONSE{
  token: string,
}
```

#### Logout:Authenticated
```
POST{}
RESPONSE{
  status: string,
  error?: string,
}
```

#### Register
```
POST{
  invitetoken: string,
  username: string,
  password: string,
}
RESPONSE{
  status: string,
  error?: string,
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

#### getRandomMessage
```
ENDPOINT: GetRandomMessage
POST{}
RESPONSE{
  messageid: string,
  timestamp: RFC3339,
  title: string,
  text: string,
  votes: number,
  comments: [
    {
      commentid: string,
      timestamp: RFC3339,
      text: string,
      votes: number,
    }
  ]
}
```

#### getDocumentation
```
ENDPOINT: GetDocumentation
POST{}
RESPONSE{
  messageid: string,
  timestamp: RFC3339,
  title: string,
  text: string,
  votes: number,
  comments: [
    {
      commentid: string,
      timestamp: RFC3339,
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

#### upvoteMessage:Authenticated
```
ENDPOINT: UpvoteMessage
POST{
  messageid: string;
}
RESPONSE{
  status: string,
  error?: string,
}
```

#### downvoteMessage:Authenticated
```
ENDPOINT: DownvoteMessage
POST{
  messageid: string;
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

#### upvoteComment:Authenticated
```
ENDPOINT: UpvoteComment
POST{
  commentid: string;
}
RESPONSE{
  status: string,
  error?: string,
}
```

#### downvoteComment:Authenticated
```
ENDPOINT: DownvoteComment
POST{
  commentid: string;
}
RESPONSE{
  status: string,
  error?: string,
}
```