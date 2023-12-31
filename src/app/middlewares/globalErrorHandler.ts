/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express';
import config from '../../config';

import { ZodError } from 'zod';
import ApiError from '../../handlingError/ApiError';
import handleValidationError from '../../handlingError/handleValidationError';
import handleZodError from '../../handlingError/handleZodError';
import { errorLogger } from '../../shared/logger';
import { handleCastError } from '../../handlingError/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  type IGenericErrorMessage = {
    path: string | number;
    message: string;
  };

  config.env === 'development'
    ? console.log('globalErrorHandler ~ ', err)
    : errorLogger.error('globalErrorHandler ~ ', err);

  let statusCode = 400;
  let message = 'Something went Good 420';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.status;
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err?.name === 'CastError') {
    const simplefiedError = handleCastError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
