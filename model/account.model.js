const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum : ['student','instructor'],
        default: 'student'
    },

    // Relationships
    courses: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Course' 
        }]
});



// Pre-save Determine role based on email
AccountSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('email')) {
        const usernamePart = this.email.split('@')[0];
        if (/^\d+$/.test(usernamePart)) {
            this.role = 'student';
        } else {
            this.role = 'instructor';
        }
    }
    next();
});

// Configure passport-local-mongoose to use email as the primary identifier
AccountSchema.plugin(passportLocalMongoose, { usernameField: 'email' });


module.exports = mongoose.model('Account', AccountSchema);