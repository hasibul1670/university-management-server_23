import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

//createDepartment Service Section
const createDepartment = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};
//getAllDepartment Service Section
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    academicDepartmentSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//getSingleDepartment Service Section
const getSingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );

  return result;
};
//updateDepartment Service Section
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');

  return result;
};
//deleteDepartment Service Section
const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return result;
};
export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  deleteDepartment,
  updateDepartment,
};
