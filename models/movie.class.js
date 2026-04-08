import mongoose from "../db/conn.js"

const {Schema} = mongoose;
const MovieSchema = new Schema({
    titulo: {type: String, required: true},
    diretor: {type: String, required: true},
    ano_lancamento: {type: Number, 
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }, required: true},
    genero: {type: String, required: true},
    avaliacao: {type: Number, 
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }, required: true}
}, {timestamps: true});

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie;