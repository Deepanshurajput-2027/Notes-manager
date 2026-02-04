//server start krna
//server or db ko connect krna

const app=require("./src/app");
const { connectToDB } = require("./src/config/database");


// backend/server.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    connectToDB();
});