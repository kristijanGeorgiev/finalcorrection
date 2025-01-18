import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DegreesService } from '../services/degrees.service';
import { Degrees } from '../models/students';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-degree-detail',
  standalone: false,
  
  templateUrl: './degree-detail.component.html',
  styleUrl: './degree-detail.component.css'
})
export class DegreeDetailComponent implements OnInit{
   degree: Degrees | undefined
     constructor(private route: ActivatedRoute, private router: Router, private degreeService: DegreesService) { }
     ngOnInit(): void {
       this.getDegreeDetails();
     }
     getDegreeDetails(): void {
       const id = this.route.snapshot.paramMap.get('id');
       
       if (id) {
         this.degreeService.getDegreesById(+id).subscribe((degree: Degrees| undefined) => {
           this.degree = degree;
         });
       }
     }
     goToDegreeList(): void {
       this.router.navigate(['/degrees']);
     }
}
