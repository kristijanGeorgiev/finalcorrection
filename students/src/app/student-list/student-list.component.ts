import { Component, OnInit } from '@angular/core';
import { Student } from '../models/students';
import { StudentsService } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: false,
  
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  students: Student[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  lastnamefilter: string = '';
  emailfilter: string = '';
  constructor(private studentsService: StudentsService, private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.students.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByFirstName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.students.sort((a, b) => {
      const firstnameA = a.firstName.toLowerCase();
      const firstnameB = b.firstName.toLowerCase();

      if (firstnameA < firstnameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (firstnameA > firstnameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getStudents(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.students = students;
      console.log(students);
    });
  }

  applyFilters(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.students= this.filterStudents(students);
    });
  }

  filterStudents(students: Student[]): Student[] {
    return students.filter(student =>
      this.filterByLastName(student) &&
      this.filterByEmail(student)
    )
  }

  filterByLastName(student: Student): boolean {
    return this.lastnamefilter === '' || student.lastName.toLowerCase().includes(this.lastnamefilter.toLowerCase());
  }

  filterByEmail(student: Student): boolean {
    return this.emailfilter === '' || student.email.toLowerCase().includes(this.emailfilter.toLowerCase());
  }

  viewStudentDetails(episode: Student): void {
    this.router.navigate(['/student-detail', episode.id]);
  }

  editStudent(episode: Student): void {
    this.router.navigate(['/student-edit', episode.id]);
  }

  deleteStudent(episode: Student): void {
    if (confirm('Do you want to delete the student')) {
      this.studentsService.deleteStudent(episode.id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}
