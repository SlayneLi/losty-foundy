const Item = require('../../model/Item');
const User = require('../../model/User');
const Taker = require('../../model/Taker');

module.exports = {
    items: async () => {
        return Item.findAll({include: User,Taker})
            .then(items =>{
                console.log(items);
                return items;
            });
        
    },
    insertItem: async (args, req) => {
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        return Item.create({
            UserID: req.userID,
            ItemName: args.itemInput.ItemName,
            RoomFound: args.itemInput.RoomFound,
            PCNumber: args.itemInput.PCNumber,
            FoundDate: args.itemInput.FoundDate,
            FoundShift: args.itemInput.FoundShift
        })
    }
}