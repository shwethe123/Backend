const { mongoose } = require("mongoose");
const cashierTwo_schema = require('../../Model/locaTwo_schema/Cashier');

const cashier_two_controller = {
    index : async (req, res) => {
        try {
            const cashierPost = await cashierTwo_schema.find().sort({ createdAt : -1});
            return res.json(cashierPost);
        } catch (error) {
            return res.status(500).json({ msg : 'Error', error:error.message});
        };
    },

    store : async (req, res) => {
        try {
            const { Id, Ag, Name, Phone, condition, selection, reason } = req.body;
            const cashierStore = await cashierTwo_schema.create({
                Id,
                Ag,
                Name,
                Phone,
                condition,
                selection,
                reason
            });
            return res.json(cashierStore);
        } catch (error) {
            return res.status(500).json({ msg : 'Error', error:error.message});
        }
    },

    show : async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'Is invalid id'});
            };
            const cashierShow = await cashierTwo_schema.findById(id);
            if (!cashierShow) {
                return res.status(404).json({ msg : 'Not Found Id'});
            };
            return res.json(cashierShow);
        } catch (error) {
            return res.status(500).json({msg: 'error', error:error.message});
        }
    },

    updated : async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'Is invalid id'});
            };
            const cashierUpdate = await cashierTwo_schema.findByIdAndUpdate(id, {...req.body});
            if (!cashierUpdate) {
                return res.status(404).json({ msg : 'Not found id'});
            };
            return res.json(cashierUpdate);
        } catch (error) {
            return res.status(500).json({ msg : 'error', error:error.message});
        }
    },

    destory : async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg : 'Is invalid Id'});
            };
            const cashier_delete = await cashierTwo_schema.findByIdAndDelete(id);
            if (!cashier_delete) {
                return res.status(404).json({ msg : 'Not found id'});
            };
            return res.json(cashier_delete);
        } catch (error) {
            return res.status(500).json({ msg : 'error', error:error.message});
        }
    }
};

module.exports = cashier_two_controller;