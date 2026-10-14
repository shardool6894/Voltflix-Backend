const { ZodError } = require("zod");

const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errorMessage = err.issues.map((e) => {
                    return `${e.path.join(".")}: ${e.message}`;
                });

                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errorMessage,
                });
            }

            next(err);
        }
    };
};

module.exports = { validateRequest };