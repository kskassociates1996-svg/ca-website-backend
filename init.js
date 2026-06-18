import db from "./config/db.js";

const createTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        service VARCHAR(100),
        subject VARCHAR(200),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Table created successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Error creating table:", err);
    process.exit(1);
  }
};

createTable();