import { Component, OnInit } from '@angular/core';
import { Degrees } from '../models/students';
import { DegreesService } from '../services/degrees.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-degree-list',
  standalone: false,
  
  templateUrl: './degree-list.component.html',
  styleUrl: './degree-list.component.css'
})
export class DegreeListComponent implements OnInit{
  degrees: Degrees[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  namefilter: string = '';
  codefilter: string = '';;
  constructor(private degreeService: DegreesService, private router: Router) { }

  ngOnInit(): void {
    this.getDegrees();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.degrees.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.degrees.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getDegrees(): void {
    this.degreeService.getDegrees().subscribe((degrees) => {
      this.degrees = degrees;
      console.log(degrees);
    });
  }

  applyFilters(): void {
    this.degreeService.getDegrees().subscribe((degrees) => {
      this.degrees= this.filterdegrees(degrees);
    });
  }

  filterdegrees(degrees: Degrees[]): Degrees[] {
    return degrees.filter(degree =>
      this.filterByname(degree) &&
      this.filterBycode(degree)
    )
  }

  filterByname(degree: Degrees): boolean {
    return this.namefilter === '' || degree.name.toLowerCase().includes(this.namefilter.toLowerCase());
  }
  filterBycode(degree: Degrees): boolean {
    return this.namefilter === '' || degree.code.toLowerCase().includes(this.codefilter.toLowerCase());
  }
  
  viewDegreeDetails(degree: Degrees): void {
    this.router.navigate(['/degree-detail', degree.id]);
  }

  editDegree(degree: Degrees): void {
    this.router.navigate(['/degree-edit', degree.id]);
  }

  deleteDegree(degree: Degrees): void {
    if (confirm('Do you want to delete the degree')) {
      this.degreeService.deleteDegrees(degree.id).subscribe(() => {
        this.getDegrees();
      });
    }
  }
}
