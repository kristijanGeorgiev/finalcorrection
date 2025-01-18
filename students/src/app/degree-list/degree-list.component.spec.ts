import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeListComponent } from './degree-list.component';

describe('DegreeListComponent', () => {
  let component: DegreeListComponent;
  let fixture: ComponentFixture<DegreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DegreeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
