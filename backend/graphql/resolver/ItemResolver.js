const Item = require('../../model/Item');
const User = require('../../model/User');
const Taker = require('../../model/Taker');

module.exports = {
    items: async (args) => {
        const where = args.filterId ? {ID: args.filterId} : {}
        return Item.findAll({
            include: [User,Taker],
            order:[['FoundDate','DESC']],
            where,
            offset: args.skip,
            limit: args.take
    })},
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
    },
    deleteItem: async (args,req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        const deleted = await Item.findAll({
            where: {
                ID: args.ID
            }
        });
        if(!deleted)
            throw new Error('Invalid Item ID');
        deleted.destroy();
        return deleted;
    },
    updateItem: async(args, req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        const item = await Item.findAll({
            where: {
                ID: args.ID
            }
        });
        if(!item)
            throw new Error('Invalid Item ID');
        if(args.itemInput !== undefined){
            item.UserID = req.userID,
            item.ItemName = args.itemInput.ItemName;
            item.RoomFound = args.itemInput.RoomFound;
            item.PCNumber = args.itemInput.PCNumber;
            item.FoundDate = args.itemInput.FoundDate;
            item.FoundShift = args.itemInput.FoundShift;
        }
        if(args.takerId !== undefined){
            item.TakerID = args.takerId;
        }
        await item.save();
        return item;
            //ID: String!, itemInput: ItemInput, takerId: int
    }
}