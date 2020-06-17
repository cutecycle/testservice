


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
    let status = 503;
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
    let status = 503;

    try {
        req.app.customers.create( {
            name: req.body.name,
            email: req.body.email
        })
    } catch (e) {
        
        response = e

    }
    res.status(status)
    res.send(response) 


}
const deleteCustomers = async function (req, res, next) { }
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
    patchCustomers
}