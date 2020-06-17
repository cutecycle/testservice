const fetch = require('node-fetch')
const util = require('util')
const axios = require('axios');


const doit = async function () {
    let rando = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // let getCustomers = await fetch("http://localhost/customers")
    // let getCertificates = await fetch("http://localhost/certificates")
    let getCustomers = await axios.get('http://localhost/customers')

    let postCustomers = await axios.post("http://localhost/customers", {
            name: `${rando}`,
            email: `${rando}@girlhours.info`
    }

    )
    let deleteCustomers = await axios.delete("http://localhost/customers/1")
    console.log(
    JSON.stringify(
        {
            getCustomers: getCustomers.data,
            // getCertificates: getCertificates,
            postCustomers: postCustomers.data

        }
    )
    )

}
doit();