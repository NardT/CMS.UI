import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingmatrixComponent } from './trainingmatrix.component';

describe('TrainingmatrixComponent', () => {
  let component: TrainingmatrixComponent;
  let fixture: ComponentFixture<TrainingmatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingmatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingmatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
