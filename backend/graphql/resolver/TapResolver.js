const Tap = require('../../model/Tap');
const Card = require('../../model/Card');

module.exports = {
    taps: async(args) =>{
        const where = args.filterId ? {ID: args.filterId} : {}
        return Tap.findAll({
            include: [Card],
            order:[['createdAt','DESC']],
            where,
            offset: args.skip,
            limit: args.take
        });
    },
    insertTap: async(args)=>{
        console.log("a")
        return Tap.create({ 
            CardID: args.cardId
        }).then(res =>{
            console.log(res);
            return res;
        });
    }
}