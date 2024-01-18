export const validateSchema = (schema) => (req, res, next) => {
    try {
        console.log(req.body)
        schema.parse(req.body)
        next()
    }catch(error) {
        console.log(error.errors)
        return res.status(400).json({ error: error.errors })
    }
}