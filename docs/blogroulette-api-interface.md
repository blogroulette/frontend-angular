# Blogroulette Api Interface

## User

#### Login

    ENDPOINT: session
    POST{
      username: string,
      password: string,
    }
    RESPONSE:200{
      username: string,
      token: string,
    }
    ERROR RESPONSE:400|5xx{
      status: string,
      error?: string,
    }

#### Logout:Authenticated

    ENDPOINT: session
    HEADER{
      Authentication: Bearer <JWT>
    }
    DELETE{}
    RESPONSE:204{}
    ERROR RESPONSE:400|5xx{
      status: string,
      error?: string,
    }

#### Register

    ENDPOINT: user
    POST{
      username: string,
      password: string,
    }
    RESPONSE:200{
      username: string,
      token: string,
    }
    ERROR RESPONSE:400|422|5xx{
      status: string,
      error?: string,
    }

### All Authenticated Requests use a JWT in the Authentication-Header-Field as a Bearer Token.

## Settings

#### Load Settings:Authenticated

    ENDPOINT: settings
    HEADER{
      Authentication: Bearer <JWT>
    }
    GET{}
    RESPONSE:200{
      username: string,
    }
    ERROR RESPONSE:400|401|403|5xx{
      status: string,
      error?: string,
    }

#### Save Settings:Authenticated

    ENDPOINT: settings
    HEADER{
      Authentication: Bearer <JWT>
    }
    PUT{
      username: string,
      password: string,
      newpassword: string,
    }
    RESPONSE:204{}
    ERROR RESPONSE:400|401|403|5xx{
      status: string,
      error?: string,
    }

## Roulette

#### get Entry

    ENDPOINT: entry/<entryid>
    HEADER{
      Authentication: Bearer <JWT>
    }
    GET{}
    RESPONSE:200{
      entryid: string,
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
    ERROR RESPONSE:400|401|404|5xx{
      status: string,
      error?: string,
    }

#### add Entry:Authenticated

    ENDPOINT: entry
    HEADER{
      Authentication: Bearer <JWT>
    }
    POST{
      title: string,
      text: string,
    }
    RESPONSE:204{}
    ERROR RESPONSE:400|401|422|5xx{
      status: string,
      error?: string,
    }

#### vote Entry:Authenticated

    ENDPOINT: entry/<entryid>/vote
    HEADER{
      Authentication: Bearer <JWT>
    }
    PUT{
      vote: up|down
    }
    RESPONSE:204{}
    ERROR RESPONSE:400|401|404|5xx{
      status: string,
      error?: string,
    }

#### add Comment:Authenticated

    ENDPOINT: entry/<entryid>/comment
    HEADER{
      Authentication: Bearer <JWT>
    }
    POST{
      text: string,
    }
    RESPONSE:204{}
    ERROR RESPONSE:400|401|422|5xx{
      status: string,
      error?: string,
    }

#### vote Comment:Authenticated

    ENDPOINT: entry/<entryid>/comment/<commentid>/vote
    HEADER{
      Authentication: Bearer <JWT>
    }
    PUT{
      vote: up|down
    }
    RESPONSE:204{}
    ERROR RESPONSE:400|401|404|5xx{
      status: string,
      error?: string,
    }
