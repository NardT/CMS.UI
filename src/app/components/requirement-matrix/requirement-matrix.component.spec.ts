import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementMatrixComponent } from './requirement-matrix.component';

describe('RequirementMatrixComponent', () => {
  let component: RequirementMatrixComponent;
  let fixture: ComponentFixture<RequirementMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
