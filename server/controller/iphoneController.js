const {Iphone} = require('../modules/module')

const iphoneController = {
 
    //add iphone
    addIphone:  async (req,res) =>{
       try {
            const name = req.body.name;
            const price = req.body.price;
            const description = req.body.description
            const photo = []
            for(let i = 0 ; i<req.files.length;i++){
              photo.push(req.files[i].filename)

            }
            // const photo = req.file.filename
            const newIphoneData = {
                name,
                price,
                description,
                photo
            }
           const newIphone = new Iphone(newIphoneData)
           const saveIphone = await newIphone.save()
           res.status(200).json(saveIphone)
       } catch (error) {
           res.status(500).json(error)
       }
    },
    //get all iphone
    getAllIphones : async(req,res) =>{
      try {
        const allIphones = await Iphone.find()
        res.status(200).json(allIphones)
      } catch (error) {
       res.status(500).json(error)
      } 
    },
     //get iphone detail
     getIphone:async(req,res) =>{
      try { 
         const iphone = await Iphone.findById(req.params.id)
         res.status(200).json(iphone);
      } catch (error) {
        res.status(500).json(error)

      }
    },
    //update book
    updateIphone : async(req,res) =>{
      try {
         const iphone = await Iphone.findById(req.params.id) 
         await iphone.updateOne({$set:req.body})
         const updateIphone = await Iphone.findById(req.params.id) 

         res.status(200).json(updateIphone);
      } catch (error) {
       res.status(500).json(error)

      }
    },
    //search iphone by name
    searchIphone:async(req,res) =>{
      try { 
        
         const iphone = await Iphone.find({"name":{$regex:req.params.id,$options:'i'}}) 
          //regex để tìm từng chữ có trong name , option cho phép tìm chữ hoa
         res.status(200).json(iphone);
      } catch (error) {
        res.status(500).json(error)

      }
    },


}
module.exports  = iphoneController