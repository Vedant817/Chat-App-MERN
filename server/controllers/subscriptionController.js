import { Resend } from 'resend';
import Subscription from '../models/Subscription.js';

const Resend_API_Key = process.env.RESEND_API_KEY || 're_ThedFaaG_5kzYQaJ8xoMUpxxc5Hi5ZjnW';
const resend = new Resend(Resend_API_Key);

const sendEmail = async (email) => {
    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Thank you for subscribing",
        html: "<h1>Thank you for subscribing HelloHub</h1><p>You will receive updates on our latest products and services</p>"
    })

    if (error) {
        return res.status(400).json({ error });
    }
    return data;
}

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            return res.status(201).json({ message: 'Email already subscribed' });
        }
        const createSubscription = await Subscription.create({ email });
        if (!createSubscription) {
            return res.status(500).json({ message: 'Error subscribing' });
        }

        const emailResult = await sendEmail(email);
        if (!emailResult) {
            return res.status(500).json({ message: 'Error sending welcome email' });
        }

        res.status(201).json({ message: 'Subscribed successfully', subscription: existingSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing', error: error.message });
    }
}

export { subscribe };