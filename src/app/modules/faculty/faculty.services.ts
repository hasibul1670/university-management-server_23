/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../handlingError/ApiError';
import { studentSearchableFields } from '../student/student.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllStudents = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};



const updateStudent = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found !');
  }

  const { name, ...facultyData } = payload;

  const updatedStudentData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty | null>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const FacultyService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
