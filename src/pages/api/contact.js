// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "@/utils/nodemailer";
import { USER_EMAIL } from "@/config";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;
    console.log(email, subject, message);
    if (!email || !subject || !message) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      // Send email
      await transporter.sendMail({
        // ...mailOptions({ from: email, subject:subject, text: message }),
        from: email,
        to: USER_EMAIL,
        subject: "Subject",
        html: `<h1>Hello asd</h1>`,
      });
      res.status(200).json({ message: 'Email sent' });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  return res.status(400).json({ message: 'Bad request' });
}

export default handler;
