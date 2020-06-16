// const sequelize = new sequelize("mysql://database:3306")

const app = require('express')()

const { getCustomers, postCustomers } = require('./routes/customers')
const { getCertificates, patchCertificates, postCertificates } = require('./routes/certificates')
const swagger = require('express-swagger-generator')(app);
app.listen(80);



const getRoot = async function (req, res) {
    res.status(200);
    res.send()
}


const log = function (req, res, next) {
    console.log("hello");
    next();

}

app.all("/", log)
app.get("/", getRoot)

app.get("/customers*", getCustomers)
app.post("/customers*", postCustomers)



app.post("/certificates*", postCertificates)
app.patch("/certificates*", patchCertificates)
/*
PATCH /certificates/1 
{
    
}
*/
app.get("certificates*", getCertificates)
/*
GET /certificates
{

    certificates: [
        {id: 1, customerId: 0, publicKey: "asdfasdfasdf", active: true}
    ]
}
*/

