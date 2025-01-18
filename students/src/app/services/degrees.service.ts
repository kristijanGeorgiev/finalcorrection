import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Degrees } from '../models/students';
import { Observable } from 'rxjs';
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DegreesService {

      apiUrl: any;
      degrees: Degrees[] = [];
      constructor(private http: HttpClient) { }
  
      getDegrees(): Observable<Degrees[]> {
          return this.http.get<Degrees[]>(`${BASE_URL}/degrees`);
      }
  
      updateDegrees(degree: Degrees): Observable<Degrees> {
          return this.http.put<Degrees>(`${BASE_URL}/degrees/${degree.id}`, degree);
      }
  
      deleteDegrees(degreeId: number): Observable<void> {
          return this.http.delete<void>(`${BASE_URL}/degrees/${degreeId}`);
      }
  
      addDegrees(newDegree: Degrees): Observable<Degrees> {
          const { id, ...degreeWithoutId } = newDegree;
          return this.http.post<Degrees>(`${BASE_URL}/degrees`, degreeWithoutId);
      }
  
      getDegreesById(degreeId: number): Observable<Degrees> {
          return this.http.get<Degrees>(`${BASE_URL}/degrees/${degreeId}`);
      }
}
