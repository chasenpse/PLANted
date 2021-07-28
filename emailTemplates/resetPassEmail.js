const wrapper = require('./emailWrapper')
const resetPassEmail = (email, emailToken) => {
    return {
        to: email,
        from: {
            email: process.env.SENDGRID_FROM_ADDRESS,
            name: "PLANted"
        },
        subject: "Password reset",
        text: `Please use the following link to update your password - https://planted.scardino.dev/reset/${emailToken}`,
        html: wrapper(`
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailBody" bgcolor="#FFFFFF" style="border-radius:4px;">
            <tr>
                <td align="center" valign="top" colspan="3" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; padding:10px;">
                    Please use the following link to update your password.
                </td>
            </tr>
            <tr>
                <td align="center" valign="top" colspan="3" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; padding:10px;">
                    Your link is active for 48 hours. After that, you will need to resend the verification email.
                </td>
            </tr>
            <tr>
                <td align="center" valign="top" width="100"></td>
                <td align="center" valign="top" width="200" style="padding:10px;">
                    <a href="https://planted.scardino.dev/reset/${emailToken}" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; text-decoration:none; font-weight:700; color:#000000; background: #45B864; border-radius:4px; display:block; padding: 10px;">Reset</a>
                </td>
                <td align="center" valign="top" width="100"></td>
            </tr>
        </table>
`),
    }
}

module.exports = resetPassEmail;