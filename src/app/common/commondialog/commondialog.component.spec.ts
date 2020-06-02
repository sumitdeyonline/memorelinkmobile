import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommondialogComponent } from './commondialog.component';

describe('CommondialogComponent', () => {
  let component: CommondialogComponent;
  let fixture: ComponentFixture<CommondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
