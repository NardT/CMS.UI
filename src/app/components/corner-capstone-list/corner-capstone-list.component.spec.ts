import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerCapstoneListComponent } from './corner-capstone-list.component';

describe('CornerCapstoneListComponent', () => {
  let component: CornerCapstoneListComponent;
  let fixture: ComponentFixture<CornerCapstoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CornerCapstoneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CornerCapstoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
