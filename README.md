# university-management-server

"Welcome to University Management Project [SERVER]! This is the server of a website that provides a platform for an Educational Institute Management system. It offers a range of features for administrators, faculty, academic semesters, and students to enhance the university educational experience."

## Features

#### The University Management Project is built with Node.js, Express, Mongoose, MongoDB, and TypeScript. It provides the following features:

### User Management:

- Registration and authentication for administrators, faculty, and students.
- Role-based access control to ensure secure access to different functionalities.

### Student Management:

- Create, update, and delete student profiles.
- Manage student enrollment in academic semesters and courses.
- Track student academic performance and generate reports.

### Faculty Management:

- Manage faculty profiles, including personal information and expertise.
- Assign faculty to specific courses and academic semesters.

### Course Management:

- Create and manage courses offered by the university.
- Assign faculty and schedule courses for academic semesters.
- Track course enrollment and availability.

### Academic Semester Management:

- Manage academic semesters, including start and end dates.
- Define course schedules and availability.
- Generate academic calendars.

## Technologies Used

- Backend: Node.js, Express.js,Typescript
- Database: MongoDB
- Deployment: Vercel
- Authentication: JWT
- Packages Used: bcrypt,http-errors,http-status-codes,zod and more.....

### Live Link(vercel): https://university-management-server.vercel.app/

### Application Routes:

#### User

- https://university-management-server.vercel.app/api/v1/users/create-student [POST]
- https://university-management-server.vercel.app/api/v1/users/create-faculty [POST]
- https://university-management-server.vercel.app/api/v1/users/create-admin [POST]
- https://university-management-server.vercel.app/api/v1/users/my-profile [GET]
- https://university-management-server.vercel.app/api/v1/users/:id [GET]
- https://university-management-server.vercel.app/api/v1/users/:id [Patch]
- https://university-management-server.vercel.app/api/v1/users/:id [Delete]

#### Student

- https://university-management-server.vercel.app/api/v1/students [GET]
- https://university-management-server.vercel.app/api/v1/students?page=1&limit=10 [GET]
- https://university-management-server.vercel.app/api/v1/students/:id [GET]
- https://university-management-server.vercel.app/api/v1/students/:id [Patch]
- https://university-management-server.vercel.app/api/v1/students/:id [Delete]

#### Faculty

- https://university-management-server.vercel.app/api/v1/faculties [GET]
- https://university-management-server.vercel.app/api/v1/faculties?searchTerm=lec [GET]
- https://university-management-server.vercel.app/api/v1/faculties/:id [GET]
- https://university-management-server.vercel.app/api/v1/faculties/:id [Patch]
- https://university-management-server.vercel.app/api/v1/faculties/:id [Delete]

#### Academic Semester

- https://university-management-server.vercel.app/api/v1/academic-semesters/create-semester [GET]
- https://university-management-server.vercel.app/api/v1/academic-semesters [GET]
- https://university-management-server.vercel.app/api/v1/academic-semesters/:id [GET]
- https://university-management-server.vercel.app/api/v1/academic-semesters/:id[Patch]
- https://university-management-server.vercel.app/api/v1/academic-semesters/:id[Delete]

#### Admin

- https://university-management-server.vercel.app/api/v1/admins [Get]
- https://university-management-server.vercel.app/api/v1/admins/:id [Get]
- https://university-management-server.vercel.app/api/v1/admins/:id [Patch]

#### Auth [Login]

- https://university-management-server.vercel.app/api/v1/auth/login [POST]
- https://university-management-server.vercel.app/api/v1/auth/change-password [POST]
- https://university-management-server.vercel.app/api/v1/auth/refresh-token [POST]

#### Email: hasibulislam1670@gmail.com
#### Website:https://university-management-server.vercel.app/

#### GitHub: https://github.com/hasibul1670
