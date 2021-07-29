const wrapper = require('./emailWrapper')
const resetPassEmail = (email, emailToken) => {
    return {
        to: email,
        from: {
            email: process.env.SENDGRID_FROM_ADDRESS,
            name: "PLANted"
        },
        subject: "Password reset",
        text: `To reset your password use the following link:\r\n\r\nhttps://planted.scardino.dev/reset/${emailToken}\r\n\r\nYour link is valid for 48 hours. After that, you'll need to resubmit a password reset request.`,
        html: wrapper(`
        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailBody" bgcolor="#FFFFFF" style="border-radius:4px;">
            <tr>
                <td align="center" valign="top" colspan="3" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; padding:10px;">
                    To reset your password, please click the button below.
                </td>
            </tr>
            <tr>
                <td align="center" valign="top" colspan="3" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; padding:10px;">
                    Your link is valid for 48 hours. After that, you'll need to resubmit a password reset request.
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