


const getCustomers = async function (req, res, next) {
    /*

    {
        id: 0,
        name: "jackie",
        certificates: [
            {publicKey: ""}
        ]
    
    }
    */
    let status = 500;
    let response = {};

    try {
        response = { customers: await req.app.tables.customers.findAll() }
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
        let newCustomer = {
            name: req.body.name,
            email: req.body.email
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


    try { 
        req.app.tables.customers.destroy({
            where: {
                id: req.params.id
            }
        })
        status=200
        response = req.app.tables.customers.findAll()
        
    }catch(e){
        status=500
        response = {error: e}
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