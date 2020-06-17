
const { Sequelize, DataTypes } = require('sequelize')
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
  email: DataTypes.TEXT,
  passwordHash: DataTypes.TEXT
});

const certificates = sequelize.define("certificates", {
  privateKey: DataTypes.TEXT,
  publicKey: DataTypes.TEXT,
  active: DataTypes.BOOLEAN
});

customers.hasMany(certificates)
certificates.belongsTo(customers, { foreignKey: 'id' })

app.sequelize = sequelize;
app.tables = {
  customers: customers,
  certificates: certificates
}



const getRoot = async function (req, res) {
  res.status(200);
  res.send()
}


const log = async function (req, res, next) {
  console.log(`${req.baseUrl}`);
  next();

}


app.use(morgan('dev'))
app.use(bodyParser.json())
app.get("/", getRoot)

app.get("/customers", getCustomers)
app.post("/customers", postCustomers)
app.delete("/customers/:id", deleteCustomers)


app.post("/customers/:id/certificates", postCertificates)
app.get("/certificates", getCertificates)
app.patch("/certificates/:id", patchCertificates)

console.log("Service started!")