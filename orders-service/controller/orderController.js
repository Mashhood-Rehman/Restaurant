import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
const orderCreate = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, amount, address, items } = req.body
        const userId = req?.user ? req?.user?.id : null
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Items are required" })
        }
        const newOrder = await prisma.order.createOrder({
            data: {
                userId,
                customerName: userId ? undefined : customerName,
                customerEmail: userId ? undefined : customerEmail,
                customerPhone: userId ? undefined : customerPhone,
                items,
                totalAmount,
                address,
                status: "Pending",
                paymentStatus: "unpaid",
            },
        })
        return res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order: newOrder,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = { orderCreate }