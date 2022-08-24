import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewparticipantsComponent } from './viewparticipants.component';

describe('ViewparticipantsComponent', () => {
  let component: ViewparticipantsComponent;
  let fixture: ComponentFixture<ViewparticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewparticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewparticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
