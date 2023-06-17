import { Schema, model } from 'mongoose';
import ApiError from '../../../handlingError/ApiError';
import { code, months, title } from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';


const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: title,
    },
    year: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: code,
    },

    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(400, 'Academic Semester is already Exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
