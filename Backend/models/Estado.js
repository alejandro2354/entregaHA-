const { Schema, model } = require('mongoose');

const EstadoSchema = Schema({
    name: {
        type: String,
        required: true
    },
},{
    collection: "estados"
});

module.exports = model('Estado', EstadoSchema);