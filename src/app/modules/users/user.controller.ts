import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const sendUserResponse = (res: Response, message: string, data: any) => {
  sendReponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendUserResponse(res, 'Student created successfully!', result);
  }
);

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...facultyData } = req.body;
    const result = await UserService.createFaculty(faculty, facultyData);

    sendUserResponse(res, 'Faculty  created successfully!', result);
  }
);

export const UserController = {
  createStudent,
  createFaculty,
};
