const bcrypt = require('bcrypt')

const hash = async function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

const selectCustomers = async function (req, res, next) {
    return await req.app.tables.customers.findAll({
        attributes: {
            exclude: ['passwordHash']
        }
        ,
        include: {
            model: req.app.tables.certificates,
            as: 'certificates',
            attributes: ['id', 'publicKey', 'active'],
        }
    })
}

const getCustomers = async function (req, res, next) {
    let status = 500;
    let response = {};

    try {
        response = await selectCustomers(req, res, next)
        status = 200
    } catch (e) {
        response = { error: e }
        status = 404
    }
    res.status(status)
    res.send(response)
}
const postCustomers = async function (req, res, next) {
    let response = {};
    let status = 500;

    try {
        console.log(req.body)
        let genHash = await hash(req.body.password)
        let newCustomer = {
            name: req.body.name,
            email: req.body.email,
            passwordHash:genHash 
        }
        const out = await req.app.tables.customers.create(newCustomer)
        status = 200
        response = req.app.tables.customers.findAll()

    } catch (e) {
        console.log(e)
        response = { error: e }
    }
    res.status(status)
    res.send(response)


}
const deleteCustomers = async function (req, res, next) {

    let status = 500
    let response = {}

    try {
        req.app.tables.customers.destroy({
            where: {
                id: req.params.id
            }
        })
        status = 200
        response = req.app.tables.customers.findAll()

    } catch (e) {
        status = 500
        response = { error: e }
    }
    res.status(status)
    res.send(response)

}

const patchCustomers = async function (req, res, next) {
    /*
    PATCH /certificates/1 
    {
        
    }
    */

}

module.exports = {
    getCustomers,
    postCustomers,
    patchCustomers,
    deleteCustomers
}