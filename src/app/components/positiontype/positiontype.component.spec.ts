import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiontypeComponent } from './positiontype.component';

describe('PositiontypeComponent', () => {
  let component: PositiontypeComponent;
  let fixture: ComponentFixture<PositiontypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositiontypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
