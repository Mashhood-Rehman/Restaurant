const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
    console.log("login req, hit")
    const { email, password } = req.body
    console.log("Login request received:", req.body)
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkUser = await prisma.user.findUnique({ where: { email } })
        if (!checkUser) {
            return res.status(400).json({ message: "User not found" })
        }
        console.log("CHECKED USER IS",checkUser)
        const comparePassword = await bcrypt.compare(password, checkUser.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign(
            { id: checkUser.id, email: checkUser.email, role: checkUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log("User logged in successfully:", checkUser.id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: checkUser.id,
                email: checkUser.email,
                name: checkUser.name,
                role: checkUser.role,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


const Signup = async (req, res) => {
    const { email, password, name } = req.body;
    console.log("Signup request received:", req.body);

    try {
        // Validate input
        if (!email || !password || !name) {
            console.log("❌ Missing fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const checkUser = await prisma.user.findUnique({ where: { email } });
        if (checkUser) {
            console.log("❌ User already exists:", email);
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        });

        // Generate token for the new user
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("✅ User created successfully:", newUser.id);

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("❌ Signup error:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}



const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during logout"
        });
    }
};

module.exports = { Login, Signup, logout }