const Taker = require('../../model/Taker');
const {imageToBase64,saveBase64toFile} = require('../../middleware/ImageConvert');

module.exports = {
    takers: async (args) => {
        const where = args.filterId ? {ID: args.filterId} : {}
        var takers = await Taker.findAll({
            where,
            offset: args.skip,
            limit: args.take
        });
        await takers.forEach(async taker =>{
            if(taker.TakerImage !== null && taker.TakerImage !== undefined)
                taker.TakerImage = await imageToBase64(taker.TakerImage);
        })
        return takers;
    },
    insertTaker: async (args, req) =>{
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        return Taker.findOne({
                where:{
                    ID: args.takerInput.ID
                }
            }).then(async taker=>{
            if(taker){
                taker.TakerImage = await imageToBase64(taker.TakerImage);
                return taker;
            }
            return Taker.create({
                ID: args.takerInput.ID,
                IDType: args.takerInput.IDType,
                TakerName: args.takerInput.TakerName,
                TakerImage: await saveBase64toFile(args.takerInput.TakerImage,'takers'),
            }).then(taker =>{
                taker.TakerImage = args.takerInput.TakerImage;
                return taker;
            });
        })
    }
}