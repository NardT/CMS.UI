import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementstypeComponent } from './requirementstype.component';

describe('RequirementstypeComponent', () => {
  let component: RequirementstypeComponent;
  let fixture: ComponentFixture<RequirementstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementstypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
