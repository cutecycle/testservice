const axios = require('axios')


const selectCerts = async function (req, res, next) {
    return req.app.tables.certificates.findAll({
        attributes: {
            exclude: ['privateKey']
        }
    }
    )
}
const customerFound = async function (req, res, next, id) {
    return req.app.tables.customers.findAll({
        where: {
            id: id
        }
    })
}

const postCertificates = async function (req, res, next) {
    let response = {};
    let status = 500;

    try {
        if (!customerFound(req, res, next, req.params.id)) {
            status = 404;
            throw "Customer not found";
        }
        console.log(req.body)
        let newCertificate = {
            privateKey: req.body.privateKey,
            publicKey: req.body.publicKey,
            customerId: req.params.id,
            active: req.body.active
        }

        const out = await req.app.tables.certificates.create(newCertificate)
        status = 200
        response = await selectCerts(req, res, next)

    } catch (e) {
        console.log(e)
        response = { error: e }
    }
    res.status(status)
    res.send(response)


}
const getCertificates = async function (req, res, next) {
    let status = 500;
    let response = {};

    try {
        response = { certificates: await selectCerts(req, res, next) }
        status = 200
    } catch (e) {
        response = { error: e }
        status = 404
    }
    res.status(status)
    res.send(response)
}
const patchCertificates = async function (req, res, next) {
    let status = 500;
    let response = {};


    try {
        let existingRecord = await req.app.tables.certificates.findOne({
            where: {
                id: req.params.id
            }
        });
        existingRecord.active = req.params.active
        existingRecord.save()
        status = 200
        response = await selectCerts(req, res, next)
        try {
            axios.post(`${process.env.HTTPBIN}/post`, {
                certificateChange: {
                    active: req.body.active,
                    updatedAt: existingRecord.updatedAt
                }
            })
        } catch (ignore) {

        }

    } catch (e) {
        response = { error: e }

    }
    res.status(status)
    res.send(response)


}





module.exports = {
    getCertificates,
    postCertificates,
    patchCertificates
}