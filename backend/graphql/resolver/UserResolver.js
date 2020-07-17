const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports ={
    users: async () => User.findAll(),
    insertUser: async (args, req ) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        return User.findOne({
                where:{
                    UserName: args.userInput.username
                }
            }).then(user=>{
            console.log(user)
            if(user)
                throw new Error('UserName Exists!');
            return bcrypt.hash(args.userInput.password,12)
        }).then(hashedPassword => {
                return User.create({
                    UserName: args.userInput.username,
                    UserPassword: hashedPassword 
                })
            }).catch(err=>{
                throw err;
            })
        // return User.create({
        //     UserName: args.userInput.username,
        //     UserPassword: bcrypt.hashSync(args.userInput.password,8) 
        // })
    },
    login: async (args) => {
        const user = await User.findOne({
            where:{
                UserName: args.userInput.username,
        }});
        if(!user)
            throw new Error('Invalid Username');
        const passCheck = await bcrypt.compare(args.userInput.password, user.UserPassword);
        if(!passCheck)
            throw new Error('Invalid Password');
        const token = await jwt.sign({userId: user.ID, userName: user.UserName}, process.env.JWT_KEY, {
            expiresIn: '1h'
        });
        return {ID: user.ID, token: token, tokenExpiration: 1};
    }
}