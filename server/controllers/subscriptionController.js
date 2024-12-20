import Subscription from '../models/Subscription.js';

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

        res.status(201).json({ message: 'Subscribed successfully', subscription: existingSubscription });
    } catch (error) {
        res.status(500).json({ message: 'Error subscribing', error: error.message });
    }
}

export { subscribe };