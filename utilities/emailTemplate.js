const emailVerifyTemplate = (user) => {
  return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet">
            </head>
            <body>
                <div style="font-family: Arial, Helvetica, sans-serif; background-color: #F0F3F7;width: 400px;height: 300px;padding: 24px; margin: 0 auto;">
                    
                    <div style="background-color: #F8F9FB;border-radius: 24px; padding: 30px 50px;">
                        <h1
                            style="font-style: normal;font-weight: 400;font-size: 24px;color: #313D5B;text-align: center; letter-spacing: 0.02em;">
                            Registeration Successfully
                        </h1>
                        
                        <p style="text-align:center; font-weight: 400;font-size: 16px; color: #313D5B;">To verify your email
                            address, click the button below:</p>
                        <div style="text-align:center ; margin-top: 50px;">
                            <a href=""
                                style="    background-color: #4CAF50;border-radius: 16px;text-decoration: none;padding: 14px 30px;color: #fff;  ">
                                Confirm registration
                            </a>
                        </div>
                       </div>
                    </div>
                </div>
            </body>

            </html>`;
};
module.exports = {
  emailVerifyTemplate,
};
