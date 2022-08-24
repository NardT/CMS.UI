import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsmappingComponent } from './requirementsmapping.component';

describe('RequirementsmappingComponent', () => {
  let component: RequirementsmappingComponent;
  let fixture: ComponentFixture<RequirementsmappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementsmappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementsmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
