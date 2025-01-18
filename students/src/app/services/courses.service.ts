import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../models/students';
import { Observable } from 'rxjs';
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

      apiUrl: any;
      courses: Courses[] = [];
      constructor(private http: HttpClient) { }
  
      getCourses(): Observable<Courses[]> {
          return this.http.get<Courses[]>(`${BASE_URL}/courses`);
      }
  
      updateCourses(course: Courses): Observable<Courses> {
          return this.http.put<Courses>(`${BASE_URL}/courses/${course.id}`, course);
      }
  
      deleteCourses(courseid: number): Observable<void> {
          return this.http.delete<void>(`${BASE_URL}/courses/${courseid}`);
      }
  
      addCourses(newCourse: Courses): Observable<Courses> {
          const { id, ...courseWithoutid } = newCourse;
          return this.http.post<Courses>(`${BASE_URL}/courses`, courseWithoutid);
      }
  
      getCoursesById(courseid: number): Observable<Courses> {
          return this.http.get<Courses>(`${BASE_URL}/courses/${courseid}`);
      }
}
