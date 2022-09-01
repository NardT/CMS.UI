import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDialogComponent } from './positionDialog.component';

describe('PositionDialogComponent', () => {
  let component: PositionDialogComponent;
  let fixture: ComponentFixture<PositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
