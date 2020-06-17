const fetch = require('node-fetch')
const util = require('util')
const axios = require('axios');


const random = function () {

    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const doit = async function () {
    let rando = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let postCustomers = await axios.post("http://localhost/customers", {
        name: `${rando}`,
        email: `${rando}@girlhours.info`,
        password: "hello"
    })
    let i=1
    let postCertificates;
    for (i; i < postCustomers.data.customers.length; i++) {
        postCertificates = await axios.post(`http://localhost/customers/${i}/certificates`,{
            privateKey: random(),
            publickey: random(),
            active: true
        }
        )
    }
    let getCertificates = await axios.get("http://localhost/certificates")

    let getCustomers = await axios.get('http://localhost/customers')


    // let deleteCustomers = await axios.delete("http://localhost/customers/1")
    debugger;
    console.log(
        JSON.stringify(
            {
                getCustomers: getCustomers.data,
                postCustomers: postCustomers.data,
                getCertificates: getCertificates.data,
                postCertificates: postCertificates.data

            }
        )
    )

}
doit();