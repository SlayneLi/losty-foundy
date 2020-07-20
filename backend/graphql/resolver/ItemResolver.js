const Item = require('../../model/Item');
const User = require('../../model/User');
const Taker = require('../../model/Taker');

const {imageToBase64, saveBase64toFile} = require('../../middleware/ImageConvert');

module.exports = {
    items: async (args) => {
        const where = args.filterId ? {ItemName: args.filterName} : {}
        var items = await Item.findAll({
            include: [User,Taker],
            order:[['FoundDate','DESC']],
            where,
            offset: args.skip,
            limit: args.take
        });
        await items.forEach(async item => {
            item.ItemImage = await imageToBase64(item.ItemImage);
        });
        return items;
    },
    insertItem: async (args, req) => {
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        return Item.create({
            UserID: req.userID,
            // UserID: 1,
            ItemName: args.itemInput.ItemName,
            RoomFound: args.itemInput.RoomFound,
            PCNumber: args.itemInput.PCNumber,
            FoundDate: args.itemInput.FoundDate,
            FoundShift: args.itemInput.FoundShift,
            ItemImage : await saveBase64toFile(args.itemInput.ItemImage,'items')
        }).then(item=>{
            return item;
        }).catch(err=>{
            console.log(err)
        })
    },
    deleteItem: async (args,req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        const deleted = await Item.findOne({
            where: {
                ID: args.ID
            }
        });
        // console.log(deleted)
        if(!deleted)
            throw new Error('Invalid Item ID');
        await Item.destroy({
            where:{
                ID: args.ID
        }});
        // return deleted;
        return true;
    },
    updateItem: async(args, req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        var item = await Item.findOne({
            where: {
                ID: args.ID
            },
            include: [Taker,User]
        })
        if(!item)
            throw new Error('Invalid Item ID');
        if(args.itemInput !== undefined){
            await Item.update({
                UserID : req.userID,
                ItemName : args.itemInput.ItemName,
                RoomFound : args.itemInput.RoomFound,
                PCNumber : args.itemInput.PCNumber,
                FoundDate : args.itemInput.FoundDate,
                FoundShift : args.itemInput.FoundShift,
                ItemImage : await saveBase64toFile(args.itemInput.ItemImage,'items')
            },{
                where: {
                    ID: args.ID
                }
            });
        }
        if(args.takerId !== undefined){
            await Item.update({
                TakerID : args.takerId
            },{
                where: {
                    ID : args.ID
                }
            });
        }
        return await item;
            //ID: String!, itemInput: ItemInput, takerId: int
    }
}