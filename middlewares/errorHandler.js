export const customError = (message, code = 505) => {
    const error = new Error(message)
    error.code = code
    return error
}

export const errorHandler = (err,req,res,next) => {
    console.log(err.message)
    const code = err.code || 500
    return res.status(code).json({
        status: 'failed',
        message: err.message || 'Internal error',
        error: err.stack,
    })
}