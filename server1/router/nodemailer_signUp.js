
const nodemailer = require("nodemailer");

const user = "testmail8108@gmail.com";
const pass = "thunDer@1234";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});