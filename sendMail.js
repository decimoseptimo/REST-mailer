async function sendMail(res, mailgunConfig, emailConfig){
    try{
        // console.log(mailgunConfig)
        // console.log(emailConfig)
        result = await _sendMail(mailgunConfig, emailConfig)
        res.status(202)
        res.send(JSON.stringify(result))
    } catch(e){
        res.status(500)
        res.send(JSON.stringify(e))
    }
}

function _sendMail(mailgunConfig, emailConfig){
    const mailgun = require('mailgun-js')(mailgunConfig)

    return new Promise((resolve, reject)=>{
        mailgun.messages().send(emailConfig, function (error, body) {
            console.log({error, body})

            if(error){
                reject({error, body})
                return
            }
            resolve(body)
        })
    })
}

module.exports = sendMail;