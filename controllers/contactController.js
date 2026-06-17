import db from "../config/db.js";
import transporter from "../services/mailService.js";

/* =========================
   SAVE CONTACT
========================= */
export const saveContact = async (req, res) => {
  try {
    const { name, email, phone, service, subject, message } = req.body;

    // 1. Save to DB first
    await db.query(
      "INSERT INTO contact_messages(name,email,phone,service,subject,message) VALUES (?,?,?,?,?,?)",
      [name, email, phone, service, subject, message]
    );

    // 2. Send Email (PUT HERE)
    await transporter.sendMail({
      from: `"KSK Associates" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Contact Message",
      html: `
        <h2>New Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ message: "Message sent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET ALL CONTACTS
========================= */
export const getContacts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contact_messages");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM contact_messages WHERE id = ?",
      [id]
    );

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};