const express = require('express');
const app = express();
const cors =require('cors');
const dotenv =require('dotenv');
dotenv.config();

const dbservice = require('./dbservice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


//create
app.post('/insert', (request, response) => {
   
    const db = dbservice.getDbServiceInstance();
    
    const result = db.insertNewPlayer(request.body);
    
    result
    .then(data => response.json({ data : data}))
    .catch(err => console.log(err));
});

//read
app.get('/getAll',(request, response) => {

    const db = dbservice.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

})

app.patch('/update',(request, response) => {
   
    const db = dbservice.getDbServiceInstance();
    
    const result = db.updatePlayerById(request.body);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

})

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params

    const db = dbservice.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

})

app.post('/search', (request,response) => {

    const db = dbservice.getDbServiceInstance();

    const result = db.searchPlayer(request.body);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

})

app.listen(process.env.PORT, () => console.log('app is running'));
