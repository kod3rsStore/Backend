const braintree = require('braintree');
const config = require('../../config/index');

let gateway = braintree.connect({
    accessToken: config.paypalAccessToken
});

function getClientKeyToken(){
    return new Promise( (resolve, reject) => {
        gateway.clientToken.generate({}, function (err, response) {
            if(err){
                return reject(err);
            }
            resolve(response.clientToken);
          }); 
    })
}

function executePayment(req){
    console.log(req.body.nonce)
    return new Promise( (resolve, reject) => {
        let saleRequest = {
            amount: req.body.amount,
            merchantAccountId: "USD",
            paymentMethodNonce: req.body.nonce,
            options: {
              submitForSettlement: true
            }
        };
        gateway.transaction.sale(saleRequest, function (err, result) {
            if (err || !result.success) {
                const result_res = {
                    message: result.message,
                    status: result.transaction.status
                }
                return reject(result_res);
            }
            resolve(result.transaction.id);
        });
    })
}

module.exports = {
    getClientKeyToken,
    executePayment,
}