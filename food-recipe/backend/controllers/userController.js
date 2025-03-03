import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = await User.create({ username, email, password });
        res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter email and password" });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );
        res.status(200).json({
            message: "Successfully logged in",
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Something went wrong during login" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'username', 'email'] 
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await user.update(req.body);
        res.status(200).json({ message: "User updated successfully", 
            user: {id: user.id, username: user.username, email: user.email}});
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Something went wrong while updating user" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Something went wrong while deleting user" });
    }
};
