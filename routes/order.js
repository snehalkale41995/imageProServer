const express = require("express");
const router = express.Router();
const { poolPromise } = require("../database/db");
var axios = require("axios");
const Joi = require("joi");
var http = require("https");
var qs = require("querystring");
const { appConfig } = require("../database/appConfig");
let jwt = require("jsonwebtoken");
let config = require("../config/config");
let middleware = require("../middleware/auth");
const nodeMailer = require("nodemailer");

router.post("/confirmOrderMail", async (request, response) => {
  let {
    email,
    userName,
    OrderDate,
    subTotal,
    Discount,
    OrderTotal,
    Status,
    orderId,
    address,
  } = request.body;
  let eventName = "Chef Bites";
  console.log("boody", request.body);
  const message = {
    from: appConfig.nodeMailerEmail,
    to: email,
    subject: "Chef Bites",
    html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
   
    <style type="text/css">
    a {text-decoration: none;}
      /* CONFIG STYLES Please do not delete and edit CSS styles below */
/* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
#outlook a {
    padding: 0;
}

.ExternalClass {
    width: 100%;
}

.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
}

.es-button {
    mso-style-priority: 100 !important;
    text-decoration: none !important;
}

a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

.es-desk-hidden {
    display: none;
    float: left;
    overflow: hidden;
    width: 0;
    max-height: 0;
    line-height: 0;
    mso-hide: all;
}

td .es-button-border:hover a.es-button-1556804085234 {
    background: #7dbf44 !important;
    border-color: #7dbf44 !important;
}

td .es-button-border-1556804085253:hover {
    background: #7dbf44 !important;
}

.es-button-border:hover a.es-button {
    background: #7dbf44 !important;
    border-color: #7dbf44 !important;
}

.es-button-border:hover {
    background: #7dbf44 !important;
    border-color: #7dbf44 #7dbf44 #7dbf44 #7dbf44 !important;
}

td .es-button-border:hover a.es-button-1556806949166 {
    background: #7dbf44 !important;
    border-color: #7dbf44 !important;
}

td .es-button-border-1556806949166:hover {
    background: #7dbf44 !important;
}

td .es-button-border:hover a.es-button-1591886393831 {
    background: #b33632 !important;
    border-color: #b33632 !important;
}

td .es-button-border-1591886393870:hover {
    background: #b33632 !important;
}

/*
END OF IMPORTANT
*/
s {
    text-decoration: line-through;
}

html,
body {
    width: 100%;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}

table {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    border-collapse: collapse;
    border-spacing: 0px;
}

table td,
html,
body,
.es-wrapper {
    padding: 0;
    Margin: 0;
}

.es-content,
.es-header,
.es-footer {
    table-layout: fixed !important;
    width: 100%;
}

img {
    display: block;
    border: 0;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
}

table tr {
    border-collapse: collapse;
}

p,
hr {
    Margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
    Margin: 0;
    line-height: 120%;
    mso-line-height-rule: exactly;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
}

p,
ul li,
ol li,
a {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    mso-line-height-rule: exactly;
}

.es-left {
    float: left;
}

.es-right {
    float: right;
}

.es-p5 {
    padding: 5px;
}

.es-p5t {
    padding-top: 5px;
}

.es-p5b {
    padding-bottom: 5px;
}

.es-p5l {
    padding-left: 5px;
}

.es-p5r {
    padding-right: 5px;
}

.es-p10 {
    padding: 10px;
}

.es-p10t {
    padding-top: 10px;
}

.es-p10b {
    padding-bottom: 10px;
}

.es-p10l {
    padding-left: 10px;
}

.es-p10r {
    padding-right: 10px;
}

.es-p15 {
    padding: 15px;
}

.es-p15t {
    padding-top: 15px;
}

.es-p15b {
    padding-bottom: 15px;
}

.es-p15l {
    padding-left: 15px;
}

.es-p15r {
    padding-right: 15px;
}

.es-p20 {
    padding: 20px;
}

.es-p20t {
    padding-top: 20px;
}

.es-p20b {
    padding-bottom: 20px;
}

.es-p20l {
    padding-left: 20px;
}

.es-p20r {
    padding-right: 20px;
}

.es-p25 {
    padding: 25px;
}

.es-p25t {
    padding-top: 25px;
}

.es-p25b {
    padding-bottom: 25px;
}

.es-p25l {
    padding-left: 25px;
}

.es-p25r {
    padding-right: 25px;
}

.es-p30 {
    padding: 30px;
}

.es-p30t {
    padding-top: 30px;
}

.es-p30b {
    padding-bottom: 30px;
}

.es-p30l {
    padding-left: 30px;
}

.es-p30r {
    padding-right: 30px;
}

.es-p35 {
    padding: 35px;
}

.es-p35t {
    padding-top: 35px;
}

.es-p35b {
    padding-bottom: 35px;
}

.es-p35l {
    padding-left: 35px;
}

.es-p35r {
    padding-right: 35px;
}

.es-p40 {
    padding: 40px;
}

.es-p40t {
    padding-top: 40px;
}

.es-p40b {
    padding-bottom: 40px;
}

.es-p40l {
    padding-left: 40px;
}

.es-p40r {
    padding-right: 40px;
}

.es-menu td {
    border: 0;
}

.es-menu td a img {
    display: inline-block !important;
}

/* END CONFIG STYLES */
a {
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    font-size: 14px;
    text-decoration: none;
}

h1 {
    font-size: 30px;
    font-style: normal;
    font-weight: normal;
    color: #659c35;
}

h1 a {
    font-size: 30px;
}

h2 {
    font-size: 26px;
    font-style: normal;
    font-weight: bold;
    color: #659C35;
}

h2 a {
    font-size: 26px;
}

h3 {
    font-size: 22px;
    font-style: normal;
    font-weight: normal;
    color: #659c35;
}

h3 a {
    font-size: 22px;
}

p,
ul li,
ol li {
    font-size: 14px;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    line-height: 150%;
}

ul li,
ol li {
    Margin-bottom: 15px;
}

.es-menu td a {
    text-decoration: none;
    display: block;
}

.es-wrapper {
    width: 100%;
    height: 100%;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-wrapper-color {
    background-color: #f6f6f6;
}

.es-content-body {
    background-color: #ffffff;
}

.es-content-body p,
.es-content-body ul li,
.es-content-body ol li {
    color: #333333;
}

.es-content-body a {
    color: #659c35;
}

.es-header {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-header-body {
    background-color: #ffffff;
}

.es-header-body p,
.es-header-body ul li,
.es-header-body ol li {
    color: #659c35;
    font-size: 16px;
}

.es-header-body a {
    color: #659C35;
    font-size: 16px;
}

.es-footer {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-footer-body {
    background-color: transparent;
}

.es-footer-body p,
.es-footer-body ul li,
.es-footer-body ol li {
    color: #ffffff;
    font-size: 14px;
}

.es-footer-body a {
    color: #ffffff;
    font-size: 14px;
}

.es-infoblock,
.es-infoblock p,
.es-infoblock ul li,
.es-infoblock ol li {
    line-height: 120%;
    font-size: 12px;
    color: #cccccc;
}

.es-infoblock a {
    font-size: 12px;
    color: #cccccc;
}

a.es-button {
    border-style: solid;
    border-color: #659C35;
    border-width: 10px 20px 10px 20px;
    display: inline-block;
    background: #659C35;
    border-radius: 0px;
    font-size: 18px;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 120%;
    color: #ffffff;
    text-decoration: none;
    width: auto;
    text-align: center;
}

.es-button-border {
    border-style: solid solid solid solid;
    border-color: #659c35 #659c35 #659c35 #659c35;
    background: #659C35;
    border-width: 0px 0px 0px 0px;
    display: inline-block;
    border-radius: 0px;
    width: auto;
}

/* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
@media only screen and (max-width: 600px) {

    p,
    ul li,
    ol li,
    a {
        font-size: 14px !important;
        line-height: 150% !important;
    }

    h1 {
        font-size: 30px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h2 {
        font-size: 22px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h3 {
        font-size: 20px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h1 a {
        font-size: 30px !important;
    }

    h2 a {
        font-size: 22px !important;
    }

    h3 a {
        font-size: 20px !important;
    }

    .es-menu td a {
        font-size: 16px !important;
    }

    .es-header-body p,
    .es-header-body ul li,
    .es-header-body ol li,
    .es-header-body a {
        font-size: 16px !important;
    }

    .es-footer-body p,
    .es-footer-body ul li,
    .es-footer-body ol li,
    .es-footer-body a {
        font-size: 14px !important;
    }

    .es-infoblock p,
    .es-infoblock ul li,
    .es-infoblock ol li,
    .es-infoblock a {
        font-size: 12px !important;
    }

    *[class="gmail-fix"] {
        display: none !important;
    }

    .es-m-txt-c,
    .es-m-txt-c h1,
    .es-m-txt-c h2,
    .es-m-txt-c h3 {
        text-align: center !important;
    }

    .es-m-txt-r,
    .es-m-txt-r h1,
    .es-m-txt-r h2,
    .es-m-txt-r h3 {
        text-align: right !important;
    }

    .es-m-txt-l,
    .es-m-txt-l h1,
    .es-m-txt-l h2,
    .es-m-txt-l h3 {
        text-align: left !important;
    }

    .es-m-txt-r img,
    .es-m-txt-c img,
    .es-m-txt-l img {
        display: inline !important;
    }

    .es-button-border {
        display: block !important;
    }

    a.es-button {
        font-size: 20px !important;
        display: block !important;
        border-left-width: 0px !important;
        border-right-width: 0px !important;
    }

    .es-btn-fw {
        border-width: 10px 0px !important;
        text-align: center !important;
    }

    .es-adaptive table,
    .es-btn-fw,
    .es-btn-fw-brdr,
    .es-left,
    .es-right {
        width: 100% !important;
    }

    .es-content table,
    .es-header table,
    .es-footer table,
    .es-content,
    .es-footer,
    .es-header {
        width: 100% !important;
        max-width: 600px !important;
    }

    .es-adapt-td {
        display: block !important;
        width: 100% !important;
    }

    .adapt-img {
        width: 100% !important;
        height: auto !important;
    }

    .es-m-p0 {
        padding: 0px !important;
    }

    .es-m-p0r {
        padding-right: 0px !important;
    }

    .es-m-p0l {
        padding-left: 0px !important;
    }

    .es-m-p0t {
        padding-top: 0px !important;
    }

    .es-m-p0b {
        padding-bottom: 0 !important;
    }

    .es-m-p20b {
        padding-bottom: 20px !important;
    }

    .es-mobile-hidden,
    .es-hidden {
        display: none !important;
    }

    .es-desk-hidden {
        display: table-row !important;
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important;
    }

    .es-desk-menu-hidden {
        display: table-cell !important;
    }

    table.es-table-not-adapt,
    .esd-block-html table {
        width: auto !important;
    }

    table.es-social {
        display: inline-block !important;
    }

    table.es-social td {
        display: inline-block !important;
    }
}

/* END RESPONSIVE STYLES */
    </style>
   
   
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table cellpadding="0" cellspacing="0" class="es-content esd-header-popover" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="88657">
                                        <table class="es-content-body" style="background-color: transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="rgba(0, 0, 0, 0)" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p10" esd-custom-block-id="14014" align="left">
                                                        <!--[if mso]><table width="580"><tr><td width="280" valign="top"><![endif]-->
                                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="280" valign="top"><![endif]-->
                                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right">
                                                            <tbody>
                                                               
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-header" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="88656">
                                        <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="center">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                                        <table  cellspacing="0" cellpadding="0" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="270" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-p5b" align="left" style="font-size:0"><a target="_blank" href="https://viewstripo.email/"><img src="https://agile-cliffs-99845.herokuapp.com/appLogo.jpg" alt style="display: block;" class="adapt-img" width="125"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center" esd-custom-block-id="44757">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left" style="background-position: center top;" esd-custom-block-id="44741">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <h2 style="color: #e2514e;">Thank you for&nbsp;the order !</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10t">
                                                                                        <p>Delivery of healthy food is the best solution for business people. Who wants to eat right, look healthy and work productively all day.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button es-p20t es-p20b es-p10r es-p10l"><span class="es-button-border es-button-border-1591886393870" style="background: #cd524e;"><a href="https://viewstripo.email/" class="es-button es-button-1591886393831" target="_blank" style="font-family: arial, &quot;helvetica neue&quot;, helvetica, sans-serif; border-width: 10px 20px; background: #e3d8d8; border-color: #e3d8d8;"> status : Pending</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                <br/>

                                                   
                                                       
                                                        <table  cellspacing="0" cellpadding="0" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p20b esd-container-frame" width="280" align="center">
                                                                        <table style="border-left:1px solid transparent;border-top:1px solid transparent;border-bottom:1px solid transparent;background-color: #efefef; border-collapse: separate; background-position: center top;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#efefef">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p20t es-p10b es-p20r es-p20l" align="center">
                                                                                        <h4 style="color: #e75b57;">SUMMARY:</h4>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="esd-block-text es-p20b es-p20r es-p20l" align="center">
                                                                                        <table style="width: 100%;" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Order #:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">${orderId}</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Order Date:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">${OrderDate}</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Sub Total:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">$ ${subTotal}</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Delivery Fee:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">Free</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Discount :</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">$ ${Discount}</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Order Total:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;">$ ${OrderTotal}</span></strong></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-size: 14px; line-height: 150%;">Delivery Addr.:</td>
                                                                                                    <td><strong><span style="font-size: 14px; line-height: 150%;"> ${address}</span></strong></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <p style="line-height: 150%;"><br></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>                                                       
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                                       
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
               
    </div>
</body>

</html>`,
  };

  var transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: appConfig.nodeMailerEmail,
      pass: appConfig.nodeMailerPassword,
    },
  });

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log("erroe", error);
    }
  });
  response.status(201).send({ data: "success" });
});

module.exports = router;
