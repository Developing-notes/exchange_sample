var { check, validationResult } = require("express-validator");
// adminelValidation
exports.email = [
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .normalizeEmail()
        .withMessage("Email Pattern Only"),]

exports.username = [
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Username required!")
];

exports.passwordConfirmPassword = [
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password required!")
        .matches("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
        .withMessage("min 6 char max 10 char one caps one symbol and 1 number"),

    check("ConfirmPassword")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Confirmpassword required!")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("confirm password at the same password");
            }
            return true;
        }),
];

exports.password = [
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password required!")
        .matches("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
        .withMessage("min 6 char max 10 char one caps one symbol and 1 number"),
]

exports.covertObj = function (email,_id) {
    return { email ,_id}
}

exports.resultValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const error = result[0].msg;
    res.json({ success: false, message: error });
};
