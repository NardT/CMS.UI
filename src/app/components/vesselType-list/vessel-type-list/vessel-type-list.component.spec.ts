import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselTypeListComponent } from './vessel-type-list.component';

describe('VesselTypeListComponent', () => {
  let component: VesselTypeListComponent;
  let fixture: ComponentFixture<VesselTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
