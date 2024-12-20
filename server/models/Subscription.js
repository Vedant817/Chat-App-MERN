import mongoose, {Schema} from 'mongoose';

const subscriptionSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;