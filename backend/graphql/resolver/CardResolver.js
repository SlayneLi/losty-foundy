const Card = require('../../model/Card');
module.exports = {
    cards: async() => {
        const where = args.filterId ? {ID: args.filterId} : {};
        return Card.findAll(where);
    },
    insertCard: async (args) =>{
        return Card.findOne({
            where:{
                ID: args.cardID
            }
        }).then(card =>{
            console.log(card);
            if(card)
                return card;
            return Card.create({
                ID: args.cardID,
                BNID: args.BNID,
                NIM: args.NIM,
                Name: args.Name
            });

        })
    }
}