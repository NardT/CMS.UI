import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerandcapstoneDialogComponent } from './cornerandcapstone-dialog.component';

describe('CornerandcapstoneDialogComponent', () => {
  let component: CornerandcapstoneDialogComponent;
  let fixture: ComponentFixture<CornerandcapstoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CornerandcapstoneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CornerandcapstoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
