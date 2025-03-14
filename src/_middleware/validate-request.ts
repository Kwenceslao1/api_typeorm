import { NextFunction, Request, Response } from "express";
import { Schema, ValidationOptions, ValidationError } from "joi";

interface ValidationResult {
    error?: ValidationError;
    value: any;
}

const validateRequest = (req: Request, next: NextFunction, schema: Schema): void => {
    const options: ValidationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    };
  
    const { error, value }: ValidationResult = schema.validate(req.body, options);
    if (error) {
      next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
      return;
    }
    req.body = value;
    next();
  };
  
  export default validateRequest;