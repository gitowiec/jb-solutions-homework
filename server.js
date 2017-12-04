const express = require("express");
const app = express();
const soap = require('soap');
const url = 'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl';
app.set("port", 3001);
console.log('server port', app.get('port'));


//9570745262


const err = (err) => {
    console.log({err});
};

app.get("/api/check-vat", (req, res) => {
    const params = {...req.query};

    if (!(params.vatNumber && params.countryCode)) {
        res.json({
            error: "Missing required parameter, params: " + JSON.stringify(params)
        });
        return;
    }
    console.log(params);
    soap.createClientAsync(url)
        .then((client) => {
            // console.log({client});
            return client.checkVatAsync(params);
        }, err)
        .then((result) => {
            // console.log({result});
            res.json(result);
        }, err);
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
