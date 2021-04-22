const confirmEmail = (email, emailToken) => {
    return {
        to: email,
        from: {
            email: process.env.SENDGRID_FROM_ADDRESS,
            name: "PLANted"
        },
        subject: "Verify your email address",
        text: `Please confirm your email to complete the registration process - http://localhost:3000/confirm/${emailToken}`,
        html: `<a href="http://localhost:3000/confirm/${emailToken}">Please confirm your email to complete the registration process</a>`,
    }
}

module.exports = confirmEmail;