export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: string;
    email: string;
    degree: string;
    year: number;
  }
  export interface Courses {
    id: number;
    name: string;
    code: string;
    semester: string;
    yearOfStudy: number;
  }
  export interface Degrees {
    id: number;
    name: string;
    code: string;
    yearsToComplete: number;
    active: boolean;
  }