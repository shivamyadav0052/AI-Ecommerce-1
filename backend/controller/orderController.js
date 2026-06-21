import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
const currency = 'inr'
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "rzp_test_RFrv5JmaI7ffnN"
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "VMaDy49Z72ILpGhd2gnN4AYh"
const razorpayApiUrl = 'https://api.razorpay.com/v1'

// for User
export const placeOrder = async (req, res) => {

    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(201).json({ message: 'Order Place' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Order Place error' })
    }

}


export const placeOrderRazorpay = async (req, res) => {
    try {

        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const orderAmount = Math.round(Number(amount) * 100)
        if (!orderAmount || Number.isNaN(orderAmount)) {
            return res.status(400).json({ message: 'Invalid order amount' })
        }

        const { data } = await axios.post(
            `${razorpayApiUrl}/orders`,
            {
                amount: orderAmount,
                currency: currency.toUpperCase(),
                receipt: newOrder._id.toString()
            },
            {
                auth: {
                    username: razorpayKeyId,
                    password: razorpayKeySecret
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return res.status(200).json(data)
    } catch (error) {
        const errorMessage = error.response?.data?.error?.description || error.response?.data?.error?.message || error.message
        console.log('Razorpay order error:', error.response?.data || errorMessage)
        return res.status(error.response?.status || 500).json({
            message: errorMessage
        })
    }
}


export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing Razorpay payment details' })
        }

        const generatedSignature = crypto
            .createHmac('sha256', razorpayKeySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex')

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Invalid payment signature' })
        }

        const { data: orderInfo } = await axios.get(
            `${razorpayApiUrl}/orders/${razorpay_order_id}`,
            {
                auth: {
                    username: razorpayKeyId,
                    password: razorpayKeySecret
                }
            }
        )

        await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true })
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.status(200).json({
            message: 'Payment Successful'
        })
    } catch (error) {
        const errorMessage = error.response?.data?.error?.description || error.response?.data?.error?.message || error.message
        console.log('Razorpay verification error:', error.response?.data || errorMessage)
        return res.status(error.response?.status || 500).json({
            message: errorMessage
        })
    }
}






export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId })
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "userOrders error" })
    }

}




//for Admin




export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "adminAllOrders error" })

    }

}

export const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body

        await Order.findByIdAndUpdate(orderId, { status })
        return res.status(201).json({ message: 'Status Updated' })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}