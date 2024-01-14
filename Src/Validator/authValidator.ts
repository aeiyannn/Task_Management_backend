const Joi = require('joi');

const userValidate = Joi.object({
    firstName: Joi.string().trim().required().messages({
        'string.base': `firstName must be a string`,
        'string.empty': `firstName cannot be empty`,
        'string.email': `firstName must be a valid email address`,
        'any.required': `firstName is required`,
    }),
    lastName: Joi.string().trim().required().messages({
        'string.base': `lastName must be a string`,
        'string.empty': `lastNamecannot be empty`,
        'string.email': `lastName must be a valid email address`,
        'any.required': `lastName is required`,
    }),
    email: Joi.string().trim().required().email().messages({
        'string.base': `Email must be a string`,
        'string.empty': `Email cannot be empty`,
        'string.email': `Email must be a valid email address`,
        'any.required': `Email is required`,
    }),
    password: Joi.string().trim().required().min(8).max(255).messages({
        'string.base': `password must be a string`,
        'string.empty': `password cannot be empty`,
        'string.min': `password should have a minimum length of {#limit}`,
        'string.max': `password should have a maximum length of {#limit}`,
        'any.required': `password is required`,
    }),
    userType: Joi.string().valid("admin", "user", "manager").optional().messages({
        'string.base': `userType must be a string`,
        'string.empty': `Name cannot be empty`,
        'string.valid': `Type only Admin or User Or Manager`,
        'any.required': `userType is required`,
    }),
})
export const validateAsync = async (data: any) => {
    try {
        await userValidate.validateAsync(data);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

