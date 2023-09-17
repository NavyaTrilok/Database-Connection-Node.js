const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
 // this line has to come first since we need to tell where is the config file.
//const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`App running on port ${port}...`);
});


app.get('/',(req,res) => {
    
    res.render('index');
    
});
/*var port = 6000
//start server
server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
    
});*/