const express = require('express')
const Operations = require('../models/operations.js');

module.exports = {
        async get_operations(req, res) {
        //console.log(req.userID);
        const userID = req.userID;
        const operations = await Operations.find({"owner":userID});
        if (operations) return res.status(200).json({ operations });
        else return res.status(404).json({ error: "Not found" });
    },  
    async get_operations_category(req, res) {
        const {params:{category}}= req;
        const userID = req.userID;
        const operations = await Operations.find({"owner":userID});
        const operation = await Operations.find({/* operations,  */category: category  })
/*         if(operations===operation){
 */      
if(operations) return res.status(200).json({operation})
        else return res.status(404).json({error: "not found"})
    },
    async get_operations_type(req, res) {
        const {params:{type}}= req;
        const operation = await Operations.find({type: type })
        if(operation) return res.status(200).json({operation})
        else return res.status(404).json({error: "not found"})
    },
    async post_operation(req, res) {
        const { concept, mount, date, type, category } = req.body;
        const userID = req.userID;
        if (concept && mount && date && type && category) {
                const newOperations = new Operations({
                    concept , mount , date , type , category, "owner":userID
                });
                await newOperations.save(newOperations);
                
                return res.status(201).json({ operations: req.body });
       } else {
            return res.status(400).json({ error: "no hay propiedades suficientes" });
        }
    },
    async put_operation(req, res) {
        const { id } = req.params;
        const { concept, mount, date,type, category} = req.body;
        const update = {};
        if (concept) update.concept = concept;
        if (mount) update.mount = mount;
        if (date) update.date = date;
        if (type) update.type = type;
        if (category) update.category = category;

        const updateOperation = await Operations.updateOne(
            { "_id": id }
            , update);
        if (updateOperation.n) {
            console.log("-----update----")
            return res.json({
                status:true,
                message: "UPDATE OK"
            })
        } else {
            return res.status(404).json({ error: "Operations not found" });
        }
    },
    async update_Status_Operation(req, res) {
        const { id } = req.params;
      //  const {operationsID}= req.body;
        const operation = await Operations.findById(id)
        const newStatus = operation.isComplete();
        if(newStatus){
           await operation.update({$set: {operationStatus: newStatus, complete_at: new Date()}})
        }else{
           await operation.update({$set: {operationStatus: newStatus, complete_at: null}})
        }
        return res.json({
            status:true,
            message:"operation status change succesfully"
        })
    },

    async delete_operation(req, res) {
        const { id } = req.params;
        console.log(id);
        if (!id) return res.status(400).json({ error: "Not enough parameters" });
        Operations.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: "data not deleted" });
            } else {
                console.log("Deleted : ", id);
                return res.status(200).json({ ok: "deleted" });
            }
        });
    }


}