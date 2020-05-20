function success(req, res, message, status){
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    })
}

function error(req, res, message, status, detail_private){
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';
    console.log(detail_private)
    res.status(statusCode).send({
        error: true,
        status: status,
        body: statusMessage
    })
}

module.exports = {
    error,
    success
}