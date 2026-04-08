import mongoose from "mongoose";

async function main(){
    await mongoose.connect(process.env.MONGODB_URI + "filmes?retryWrites=true&w=majority");
    console.log("Conectou MongoDB");
}
await main().catch((err)=>{console.log("Erro na conexão com o Banco: " + err)})
export default mongoose;