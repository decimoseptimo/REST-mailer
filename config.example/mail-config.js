module.exports = {
    mailgun: {
        apiKey: 'key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        domain: 'example.com',
    },
    mail: (name, email, message)=>({
        from: `${name} <${email}>`,
        to: 'name@example.com',
        subject: `Message from ${email} via Example.com`,
        text: message,
    })
}