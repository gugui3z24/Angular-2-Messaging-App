import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDraftMessageComponent } from './view-draft-message.component';

describe('ViewDraftMessageComponent', () => {
  let component: ViewDraftMessageComponent;
  let fixture: ComponentFixture<ViewDraftMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDraftMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDraftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
