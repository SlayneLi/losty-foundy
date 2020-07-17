const Taker = require('../../model/Taker');

module.exports = {
    takers: async () => Taker.findAll(),
    insertTaker: async (args, req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        return Taker.findOne({
                where:{
                    ID: args.takerInput.ID
                }
            }).then(taker=>{
                console.log(taker)
            if(taker)
                return taker;
            return Taker.create({
                ID: args.takerInput.ID,
                IDType: args.takerInput.IDType,
                TakerName: args.takerInput.TakerName,
                TakerImage: args.takerInput.TakerImage,
            });
        })
    }
}