import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSentMessageComponent } from './view-sent-message.component';

describe('ViewSentMessageComponent', () => {
  let component: ViewSentMessageComponent;
  let fixture: ComponentFixture<ViewSentMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSentMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
