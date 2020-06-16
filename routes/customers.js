
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
    let customers = {
        customers: []
    };
    res.status(200)
    res.send(customers)

}
const postCustomers = async function (req, res, next) { }
const patchCustomers = async function (req, res, next) { }

module.exports = {
    getCustomers,
    postCustomers,
    patchCustomers
}