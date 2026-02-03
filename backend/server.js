//server start krna
//server or db ko connect krna

const app=require("./src/app");
const { connectToDB } = require("./src/config/database");


app.listen(3000,()=>{
    console.log("Server is running at port 3000");
    connectToDB()
})