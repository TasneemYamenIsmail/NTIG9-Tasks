const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:/^[a-zA-Z]+$/,
        min:8
    },
    password:{
        type: String,
        required: true,
        trim: true,
        min:8,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        validate(value){
            if( value.toLowerCase().includes('123') ||
            value.toLowerCase().includes('pass') ||
            value.toLowerCase().includes('password') ||
            value.toLowerCase().includes(this.name))
                    throw new Error('Invalid Password')
        }
    },
    phoneNum:{
        type: String,
        trim: true,
        validate(value){
            if(value && !validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    position:{
        type: String,
        required: true
    },
    type:{
        type:Boolean,
        required: true
    },
    profileImg:{
        type: String,
        default: ''
    },
    status:{
        type:Boolean,
        default: true
    },
    tokens:[
        { token:{type:String}}
    ]
}, {timestaps: true,
    toJSON: {virtuals: true}
});

userSchema.virtual('employeeTasks', {
    ref:'Task',
    localField:"_id",
    foreignField:"employeeId"
})

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 16);
    }
    next();
})

userSchema.statics.findCredientials = async function(userName, password) {

    const user = await User.findOne({userName});
    if(!user)
        throw new Error('User Not Found');

    const isValidPass = await bcrypt.compare(password, user.password);
    if(!isValidPass)
        throw new Error('Password Not Valid');
    return user;
}

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id}, process.env.JWTSECURITY);
    console.log('token:',token);
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

const User = mongoose.model('User',userSchema);
module.exports = User;