export const alertTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=">
    <title>{{title}}</title>
</head>

<body style="margin:0;font-family:arial">
    <table style="border:0;width:100%">
        <tr style="background:#eeeeee">
            <td style="padding:20px;color:#808080;text-align:center;font-size:20px;font-weight:600">
                {{title}}
            </td>
        </tr>
        <tr>
            <td style="padding:20px;color:#808080;font-size:16px;font-weight:100">
                {{message}}<br>
            </td>
        </tr>
    </table>
</body>

</html>
`;
