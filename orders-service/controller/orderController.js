const { PrismaClient } = require("@prisma/client")
const { getChannel } = require("../broker/rabbit")

const prisma = new PrismaClient()

const orderCreate = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, amount, address, items } = req.body
        const userId = req?.user ? req?.user?.id : null
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Items are required" })
        }

        const channel = await getChannel()

        const newOrder = await prisma.order.create({
            data: {
                userId,
                customerName: userId ? "" : customerName,
                customerEmail: userId ? "" : customerEmail,
                customerPhone: userId ? "" : customerPhone,
                items,
                amount,
                address,
                status: "Pending",
                paymentStatus: "unpaid",
            },
        })
        channel.publish(
            "order-events", "order.created",
            Buffer.from(JSON.stringify({
                userId,
                customerName,
                customerEmail,
                customerPhone,
                items,
                amount,
                address,
                status: "Pending",
                paymentStatus: "unpaid",

            })),
            { persistent: true }
        )
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

const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany()

        return res.status(200).json({
            message: "Orders fetched successfully", orders
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error })
    }
}
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = Number(req.params.orderId);
        const { status } = req.body;
        const updatedOrder = await prisma.order.update({
            where: { orderId: orderId },
            data: { status }
        });
        return res.status(200).json({
            message: "Order status updated",
            updatedOrder
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
module.exports = { orderCreate, getOrders, updateOrderStatus }