import { Request, Response } from 'express';

import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';

import { StatusCodes } from 'http-status-codes';
import sendReponse from '../../../shared/sendResponse';
import { studentFilterableFields } from '../student/student.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.services';

const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<IFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendFacultyResponse(res, 'Faculties retrieved successfully !', result);
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;//id

  const result = await FacultyService.getSingleFaculty(id);

  sendFacultyResponse(res, 'Faculty retrieved successfully !', result);
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyService.updateFaculty(id, updatedData);

  sendFacultyResponse(res, 'Faculty Update successfully !', result);
});

export const FacultyController = {
  getAllFaculties,
  updateFaculty,
  getSingleFaculty,
};
