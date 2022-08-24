import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterschedulingComponent } from './registerscheduling.component';

describe('RegisterschedulingComponent', () => {
  let component: RegisterschedulingComponent;
  let fixture: ComponentFixture<RegisterschedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterschedulingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterschedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
