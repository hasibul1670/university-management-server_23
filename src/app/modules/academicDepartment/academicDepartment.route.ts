import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);
router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
