/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { paginationFields } from './../../../constants/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.constants';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';
const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<IAcademicFaculty>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};
//create Faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );
  sendFacultyResponse(res, 'Academic Faculty is created successfully', result);
});
// get all faculty
const getAllFaculties = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );
  sendFacultyResponse(res, 'Academic Faculties retrieved successfully', result);
});
// get a single Faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  sendFacultyResponse(res, 'Single Faculty retrieved successfully', result);
});

// Update a Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updateData);
  sendFacultyResponse(res, 'Academic Faculty updated successfully', result);
});
// Delete Faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendFacultyResponse(res, 'Academic Faculty Delete successfully', result);
});
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
};
