import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendReponse from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const sendDepartmentResponse = async (
  res: Response,
  message: string,
  data: any
) => {
  sendReponse<IAcademicDepartment>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};
//create a Department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );
  sendDepartmentResponse(res, 'Department is created successfully', result);
});

//Get all departments
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendDepartmentResponse(
    res,
    ' All Academic departments fetched successfully',
    result
  );
});
//Get a Single Department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendDepartmentResponse(res, 'Single department is found', result);
});
//Update Department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.updateDepartment(id, req.body);

  await sendDepartmentResponse(
    res,
    `Department is Updated successfully`,
    result
  );
});
//Delete a Single Department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.deleteDepartment(id);

  await sendDepartmentResponse(
    res,
    `Department is Deleted successfully`,
    result
  );
});
export const AcademicDepartmentController = {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
