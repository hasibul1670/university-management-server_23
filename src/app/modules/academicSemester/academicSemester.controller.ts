import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const sendFacultyResponse = (res: Response, message: string, data: any) => {
  sendReponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body;
  const result = await AcademicSemesterService.createSemesterService(
    semesterData
  );
  sendFacultyResponse(res, 'Semester is Created Successfully!', result);
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.getAllsemesters(
    filters,
    paginationOptions
  );
  sendFacultyResponse(res, 'Semesters retrieved successfully !', result);
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendFacultyResponse(res, ' Semester Deleted successfully !', result);
});
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  sendFacultyResponse(res, 'Single Semester retrieved successfully !', result);
});
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, UpdateData);
  sendFacultyResponse(res, 'Semester Data Is Updated successfully!', result);
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  deleteSemester,
  updateSemester,
};
