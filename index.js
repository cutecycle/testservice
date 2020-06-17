
const { Sequelize , DataTypes} = require('sequelize')
const sequelize = new Sequelize(`mysql://root:password@database:3306/${process.env.DATABASE}`)

const app = require('express')()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const { getCustomers, postCustomers, deleteCustomers } = require('./routes/customers')
const { getCertificates, patchCertificates, postCertificates } = require('./routes/certificates')
const swagger = require('express-swagger-generator')(app);
app.listen(80);

const customers = sequelize.define("customers", {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT
});

const certificates = sequelize.define("certificates", {
  privateKey: DataTypes.TEXT,
  publicKey: DataTypes.TEXT
});

customers.hasMany(certificates)
certificates.belongsTo(customers)

app.sequelize = sequelize;
app.tables = {
    customers: customers,
    certificates: certificates
}



const getRoot = async function (req, res) {
    res.status(200);
    res.send()
}


const log = async  function (req, res, next) {
    console.log(`${req.baseUrl}`);
    next();

}


app.use(log)
app.use(bodyParser.json())
app.get("/", getRoot)

app.get("/customers*", getCustomers)
app.post("/customers*", postCustomers)
app.delete("/customers/:id", deleteCustomers)


app.post("/certificates*", postCertificates)
app.patch("/certificates*", patchCertificates)
app.get("certificates*", getCertificates)
console.log("Service started!")