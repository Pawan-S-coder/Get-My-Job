import { body, validationResult } from 'express-validator';

export const jobFormValidation=[
  body('jobCategory').notEmpty().withMessage('job Category must be specified'),
    body('jobDesignation').notEmpty().withMessage('job designation must be specified'),
    body('jobLocation').notEmpty().withMessage('job Location must be specified'),
    body('companyName').notEmpty().withMessage('company name must be specified'),
    body('salary').isFloat({gt:0}).withMessage('salary must be a number between greater then 0'),
    body('numberOfOpenings').isFloat({gt:0}).withMessage('opening number must be greater then zero 0'),
    body('skillsRequired').isArray({ min: 1 }).withMessage('At least one skill is required'),
    body('applyBy').isDate({ format: 'YYYY-MM-DD' }).withMessage('Apply By must be a valid date (DD-MM-YYYY)')
    .custom((value) => {
        const currentDate = new Date().toISOString().split('T')[0];
        if (value <= currentDate) {
            throw new Error('Apply By date must be in the future');
        }
        return true;
    }),    (req,res,next)=>{
        var validationErrors= validationResult(req);
        if(!validationErrors.isEmpty()){
            return res.render('newjobpage',{errorMessage:validationErrors.array()[0].msg})
        };
       
        next();
    }
]
