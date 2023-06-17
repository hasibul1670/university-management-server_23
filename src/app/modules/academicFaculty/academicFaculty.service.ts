import { buildWhereConditions } from '../../../helpers/buildWhereCondition';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterSearchableFields } from '../academicSemester/academicSemester.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { whereConditions, sortConditions } = buildWhereConditions(
    searchTerm,
    filtersData,
    academicSemesterSearchableFields,
    sortBy,
    sortOrder
  );

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
};
