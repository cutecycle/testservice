const fetch = require('node-fetch')
const util = require('util')
const axios = require('axios');


const random = async function () {

    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const doit = async function () {
    let rando = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // let getCustomers = await fetch("http://localhost/customers")
    // let postCertificates = await fetch("http://localhost/customers/1/certificates",
    //     {
    //         privateKey: random(),
    //         publickey: random()
    //     }

    // )
    // let getCertificates = await fetch("http://localhost/certificates")

    let getCustomers = await axios.get('http://localhost/customers')

    let postCustomers = await axios.post("http://localhost/customers", {
        name: `${rando}`,
        email: `${rando}@girlhours.info`,
        password:"hello"
    }

    )
    // let deleteCustomers = await axios.delete("http://localhost/customers/1")
    debugger;
    console.log(
        JSON.stringify(
            {
                getCustomers: getCustomers.data,
                postCustomers: postCustomers.data,
                getCertificates: getCertificates.data

            }
        )
    )

}
doit();