import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselTypeDialogComponent } from './vessel-type-dialog.component';

describe('VesselTypeDialogComponent', () => {
  let component: VesselTypeDialogComponent;
  let fixture: ComponentFixture<VesselTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
