import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            minlength: [2, 'Full name must be at least 2 characters long'],
            maxlength: [50, 'Full name cannot exceed 50 characters'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false,
        },
        avatar: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['online', 'offline', 'away'],
            default: 'offline',
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        blockedUsers: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    }
);

//! Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ fullName: 'text' }); //? Enable text search on fullName

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const User = model('User', userSchema);

export default User;