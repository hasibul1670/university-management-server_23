import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type academicTitle = 'Autumn' | 'Summer' | 'Fall';
export type academicCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: academicTitle;
  year: string;
  code: academicCode;
  startMonth: Month;
  endMonth: Month;
};

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};

// Create a new Model type that knows about IUserMethods
export type AcademicSemesterModel = Model<IAcademicSemester>;
