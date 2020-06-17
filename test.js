const fetch = require('node-fetch')


const doit = async function () {
    while (true) {
        await new Promise(r => setTimeout(r, 2000));
        let rando = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let getCustomers = await fetch("http://testservice/customers")
        let getCertificates = await fetch("http://testservice/certificates")

        let postCustomers  = await fetch("http://testservice/customers", {
            method: "POST",
            body: { 
                name: `${rando}`,
                email: `${rando}@girlhours.info`
            }

        })
    }
}