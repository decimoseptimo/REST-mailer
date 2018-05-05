# REST mailer

A REST API for sending mails in NodeJS/Express using Mailgun as ESP.

Specifically, this is a backend service that handles the actual mail sending of a contact form in a static website as part of a JAMstack architecture.

## Installation
- `npm install`
- Review server config in `server.js`
- Setup configuration file in `config/mail-config.js`.\
  `config.example/` is provided as example.
- `npm start`

## API
##### Send Mail
* POST /api/v1/contact-form

_Model_
```js
contact-form {
    name (not_null),
    email (not_null, email),
    subject (not_null),
}
```

## Advanced
##### Multiple forms
Creating another form is easy, just clone an existing route. From there you can set the endpoint URL, configuration file, and validate input.

```
router.post('/new-endpoint', function (req, res){
    const config = require('./config/new-config')
    const {name, email, message} = req.body

    if (name && email && message){
        sendMail(res, config.mailgun, config.mail(name, email, message))
    }
    else{
        error = {error: 'Missing parameters. Name, email, & message are required.'}
        console.log(error)
        res.status(400)
        res.send(JSON.stringify(error))
    }
})
```

##### Different domains
If POSTing from a different domain, add the domain(s) to the `allowedOrigins` array. This is in compliance with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy. Otherwise the browser will fail to load the endpoint and its console may show `No 'Access-Control-Allow-Origin' header is present ` errors.
