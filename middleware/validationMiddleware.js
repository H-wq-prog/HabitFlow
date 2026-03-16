const validate = (schema) => {
    return (req, res, next) => {
        // check if data in request 
        const { error } = schema.validate(req.body);
        // if error return error massage to client
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        // if no error call next controller
        next();
    };
};

module.exports = validate;