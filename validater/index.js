const Joi = require('joi');

const signUpSchema = Joi.object({
    name: Joi.string().allow("").empty(),
    fatherName: Joi.string().allow("").empty(),
    email: Joi.string().email().required(),
    personalEmail: Joi.string().email().required(),
    mobile: Joi.string().allow("").empty(),
    branch: Joi.string().allow("").empty(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    address: Joi.string().allow("").empty(),
    aadhaarNumber: Joi.string().allow("").empty(),
    dateofBirth: Joi.date().allow(null),
    bloodGroup: Joi.string().allow(null),
    panDetails: Joi.string().allow(null),
    whatsAppNumber: Joi.string().allow(null),
    vehicleDetails: Joi.string().allow(null),
    uploadResume: Joi.string().allow(null),
    maritalStatus: Joi.string().allow(null),
    relation: Joi.string().allow(null),
    age: Joi.string().allow(null),
    occupation: Joi.string().allow(null),
    aadhaarNumber: Joi.string().allow(null),
    uploadAadhaar: Joi.string().allow(null),
});



const addResuma = Joi.object({
    Resumeof: Joi.string().required(),

})

const addProjectPlan = Joi.object({
    projectPlan: Joi.string().required(),
    name: Joi.string().allow("").empty(),
    addedBy: Joi.string().required()
   
    
})

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


const changePasswordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    email: Joi.string().email().required(),
});



const resetPasswordSchema = Joi.object({
    // password: Joi.string().required(),
    // newPassword: Joi.string().required(),
    email: Joi.string().email().required(),
});



const validationMiddleware = async (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
    };
   


    if (schema === "signUp") {
        var { error } = signUpSchema.validate(req.body, options);
    }
    if (schema === "LogIn") {
        var { error } = LoginSchema.validate(req.body, options);
    }
    if (schema === 'changePassword'){
        var { error } = changePasswordSchema.validate(req.body, options);
     }
     if (schema === 'addResuma'){
        var { error } = addResuma.validate(req.body, options);
     }


   
    if (schema === "resetPassword") {
        var { error } = resetPasswordSchema.validate(req.body, options);
    }



    if (schema === "addProjectPlan") {
        var { error } = addProjectPlan.validate(req.body, options);
    }



   
    if (error) {
        let validateErrors = { 'validationError': error.details[0].message }
        res.status(400).json(validateErrors)
    } else {
        next();
    }
};


module.exports = validationMiddleware

