import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const server = StreamChat.getInstance(API_KEY, API_SECRET);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, userName } = req.body;
    const { users } = await server.queryUsers({ name: userName });
    if (users.length > 0) return res.json({ message: "User already exists" });
    const userId = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10);
    const token = server.createToken(userId);

    // Create user in StreamChat
    await server.upsertUser({
      id: userId,
      name: userName,
      firstName,
      lastName,
      hashPassword,
    });

    res.json({ token, firstName, lastName, userId, userName, hashPassword });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { users } = await server.queryUsers({ name: userName });

    if (users.length === 0) return res.json({ message: "User not Found" });

    const token = server.createToken(users[0].id); // ******
    const passwordMatch = await bcrypt.compare(password, users[0].hashPassword);

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        userName,
        userId: users[0].id,
      });
    } else {
      res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is Run On Port 3001 ");
});
