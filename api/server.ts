import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

const app = express();
app.use(cors());
app.use(express.json());

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "typescript1",
// });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  ssl: {
    rejectUnauthorized: true // Enforce SSL for DO
  }
});

const client = new OAuth2Client("759282268919-cfu3n7h5ao3e7v5f2dpsaoj2r7njj8t0.apps.googleusercontent.com");

// === Existing username/password login ===
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

//   try {
//     const [rows]: any = await db.query(
//       "SELECT * FROM users WHERE username = ? AND password = ?",
//       [username, password]
//     );

//     if (rows.length > 0) {
//       res.json({
//         success: true,
//         fullname: rows[0].fullname,
//         message: "Login successful",
//       });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

 try {
  // ❌ DANGEROUS: user input is directly inserted into the SQL query
  const query = `
    SELECT * FROM users 
    WHERE username = '${username}' 
    AND password = '${password}'
  `;

  console.log("Executing vulnerable query:", query);

  const [rows]: any = await db.query(query);

  if (rows.length === 0) {
    return res.json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  const user = rows[0];
  res.json({
    success: true,
    fullname: user.fullname,
    role: user.role,
    message: "Login successful!",
  });

} catch (err) {
  console.error("Login error:", err);
  res.status(500).json({ success: false, message: "Server error." });
}
});


// === Google login route ===
app.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "759282268919-cfu3n7h5ao3e7v5f2dpsaoj2r7njj8t0.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ success: false, message: "Invalid token" });

    }

    const { email, name, sub } = payload;

    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      await db.query(
        "INSERT INTO users (fullname, email, google_id) VALUES (?, ?, ?)",
        [name, email, sub]
      );
    }

    res.json({
      success: true,
      fullname: name,
      email,
      message: "Google login successful",
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get List of departments
app.get("/departments", async (req, res) => {
  try {
    const add = req;
    console.log(add)
    const [rows] = await db.query("SELECT * FROM departments");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Create departments
app.post("/departments", async (req, res) => {
  const { abbreviation, name, description, status } = req.body;

  try {
    await db.query(
      "INSERT INTO departments (abbreviation, name, description, status) VALUES (?, ?, ?, ?)",
      [abbreviation, name, description, status]
    );
    res.json({ success: true, message: "Department added successfully" });
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/departments/:id", async (req, res) => {
  const { id } = req.params;
  const { abbreviation, name, description, status } = req.body;

  try {
    await db.query(
      "UPDATE departments SET abbreviation = ?, name = ?, description = ? , status = ? WHERE id = ?",
      [abbreviation, name, description, status, id]
    );
    res.json({ success: true, message: "Department edited successfully" });
  } catch (error) {
    console.error("Error edited department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/departments/:id", async (req, res) => {
  const { id } = req.params;


  try {
    await db.query(
     "DELETE FROM departments WHERE id = ?", 
     [id]
    );
    res.json({ success: true, message: "Department edited successfully" });
  } catch (error) {
    console.error("Error edited department:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {  // ← '0.0.0.0' allows external connections
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});


// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";
// import { OAuth2Client } from "google-auth-library";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "typescript1",
// });

// const client = new OAuth2Client("759282268919-cfu3n7h5ao3e7v5f2dpsaoj2r7njj8t0.apps.googleusercontent.com");

// // === Existing username/password login ===
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [rows]: any = await db.query(
//       "SELECT * FROM users WHERE username = ? AND password = ?",
//       [username, password]
//     );

//     if (rows.length > 0) {
//       res.json({
//         success: true,
//         fullname: rows[0].fullname,
//         message: "Login successful",
//       });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // === Google login route ===
// app.post("/google-login", async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "759282268919-cfu3n7h5ao3e7v5f2dpsaoj2r7njj8t0.apps.googleusercontent.com",
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       return res.status(400).json({ success: false, message: "Invalid token" });
//     }

//     const { email, name, sub } = payload;

//     const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

//     if (rows.length === 0) {
//       await db.query(
//         "INSERT INTO users (fullname, email, google_id) VALUES (?, ?, ?)",
//         [name, email, sub]
//       );
//     }

//     res.json({
//       success: true,
//       fullname: name,
//       email,
//       message: "Google login successful",
//     });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.listen(4000, () => console.log("Server running on http://localhost:4000"));


// import express from "express";
// import cors from "cors";
// import mysql from "mysql2/promise";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createPool({
//   host: "localhost",      // your MySQL host
//   user: "root",           // your MySQL username
//   password: "",           // your MySQL password
//   database: "typescript",    // your database name
// });

// db.getConnection()
//   .then(() => console.log("Connected to MySQL database"))
//   .catch((err) => console.error("Database connection failed:", err));

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [rows]: any = await db.query(
//       "SELECT * FROM users WHERE username = ? AND password = ?",
//       [username, password]
//     );

//     if (rows.length > 0) {
//       res.json({ success: true, message: "Login successful" });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.listen(4000, () => console.log("Server running on http://localhost:4000;"));




// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [
//   { username: "admin", password: "1234" },
//   { username: "guest", password: "guest" },
// ];

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (user) {
//     res.json({ success: true, message: "Login successful" });
//   } else {
//     res.json({ success: false, message: "Invalid credentials" });
//   }
// });

// app.listen(4000, () => console.log("Server running on http://localhost:4000;"));