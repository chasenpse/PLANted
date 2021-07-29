const emailWrapper = (body) => {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name=”x-apple-disable-message-reformatting”>
        <meta name="color-scheme" content="only">
        <title>PLANted</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
        </style>
    </head>
    <body bgcolor="#EEEEEE" style="padding:0;">
        <table border="0" bgcolor="#EEEEEE" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="400" id="emailContainer">
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailHeader">
                                    <tr>
                                        <td align="center" valign="top" style="font-family: 'Nunito', Arial, Helvetica, sans-serif; font-size:32px">
                                            <span style="font-weight:900">PLAN</span>ted
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                                ${body}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
`
}

module.exports = emailWrapper;