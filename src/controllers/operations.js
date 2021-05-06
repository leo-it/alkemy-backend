const express = require('express')
const Operations = require('../models/operations.js');

module.exports = {
    async get_operations(req, res) {
        const operations = await Operations.find();
        if (operations) return res.status(200).json({ operations });
        else return res.status(404).json({ error: "Not found" });
    },
    async post_operation(req, res) {
        const { concept, mount, date, type, category } = req.body;
        console.log(concept, mount, date, type, category);

        if (concept && mount && date && type && category) {
                const newOperations = new Operations(req.body);
                await newOperations.save(newOperations);
                console.log(newOperations);
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
            return res.status(200).json({ ok: true })
        } else {
            return res.status(404).json({ error: "Operations not found" });
        }
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