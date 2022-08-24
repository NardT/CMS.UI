import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesseltypeComponent } from './vesseltype.component';

describe('VesseltypeComponent', () => {
  let component: VesseltypeComponent;
  let fixture: ComponentFixture<VesseltypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesseltypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesseltypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
