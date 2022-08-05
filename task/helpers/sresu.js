const USER = require('../models/sresu')
const VALIDATE = require('../middlewares/srotadilav')
const { validate } = require('../models/sresu')
const UKEY = require("crypto").randomBytes(20).toString("hex");
const JWT = require('jsonwebtoken')
const USERDETAILS = require('../models/sliatedresu')
const CRYPTR = require("cryptr");
const CRYPTRNP = new CRYPTR("myTotalySecretKey");
var tokenvalidate
exports.register = (req, res) => {
    USER.insertMany(
        {
            email: req.body.email,
            password: req.body.password//encrypt
        })
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    success: "Admin registeration success!",
                    message: data
                })
            }
            else {
                res.json({ status: 404, message: 'Somethings went wrong!' })
            }
        }).catch(error => {
            console.log(error)
        })
}




exports.login = (req, res) => {
    var email = req.body.email;//passwordpending
    USER.findOne({ email: email }, function (err, data) {
        var userId = data._id
        console.log("🚀 ~ file: sresu.js ~ line 39 ~ userId", userId)
        if (err) throw err
        else if (data == null) {
            res.json({
                status: false,
                message: "Invalid E-Mail or Password"
            })
        }
        else {
            var password = data.password
            if (password == req.body.password) {
                let user = VALIDATE.covertObj(email, userId); //parameterpass
                JWT.sign({ user: user }, UKEY,
                    { expiresIn: "60m" }, (err, token) => {
                        console.log("🚀 ~ file: userexp.js ~ line 63 ~ token", token)
                        res.json({
                            userstatus: 1,
                            message: "Login success!",
                            success: data,
                            token: token
                        })

                        tokenvalidate = token;

                    })
                //  userdetailscollection
                USERDETAILS.insertMany({ userId:userId,firstName: "John", lastName: "David" }, function (err, data) {
                    console.log("🚀 ~ file: sresu.js ~ line 62 ~ USERDETAILS.save ~ data", data)
                })
            }
            else {
                res.json({
                    status: false, message:
                        "Invalid E-Mail or Password"
                })
            }
        }

    })

}

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        // decodeemail_method
        var decDetail = JWT.decode(req.token);
        console.log("🚀 ~ file: sresu.js ~ line 80 ~ decDetail", decDetail)
        var userEmail = decDetail.user.email;
        var userId = decDetail.user._id
        if (tokenvalidate == req.token) {
            JWT.verify(req.token, UKEY, function (err, data) {
                if (err) res.json({ status: false, message: err });
                else {
                    // middleware use the method
                    req.email = userEmail;
                    req._id = userId;
                    next();
                }
            });
        }
        else {
            res.json({ status: false, message: `Token expired!,login again!` });
        }
    } else {
        res.json({ status: false, message: `Token Empty!` });
    }
};

exports.logout = (req, res) => {
    var email = req.email;
    USER.findOne(
        { email: email },
        function (err, data) {
            if (err) {
                res.status(500).json({ error: "something went wrong" });
            } else {
                res.status(200).json({ success: "logout successfully" });
                tokenvalidate = null
            }
        }
    );
};

exports.getDetails = (req, res) => {
        var userId=req._id//jwt get id 
        console.log("🚀 ~ file: sresu.js ~ line 131 ~ userId", userId)
        USERDETAILS.findOne({userId:userId},function(err,data){//first collection
        var firstName=data.firstName
        USERDETAILS.updateOne({firstName:"vivek"},function(err,data){//second collection
        console.log("🚀 ~ file: sresu.js ~ line 131 ~ USERDETAILS.updateOne ~ data", data)
        })
        })
}

