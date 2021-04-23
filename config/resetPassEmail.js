const resetPassEmail = (email, emailToken) => {
    return {
        to: email,
        from: {
            email: process.env.SENDGRID_FROM_ADDRESS,
            name: "PLANted"
        },
        subject: "Password reset",
        text: `Please use the following link to change your password - http://localhost:3000/reset/${emailToken}`,
        html: `<a href="http://localhost:3000/reset/${emailToken}">Please use the following link to change your password</a>`,
    }
}

module.exports = resetPassEmail;