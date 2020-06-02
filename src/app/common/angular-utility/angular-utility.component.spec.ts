import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUtilityComponent } from './angular-utility.component';

describe('AngularUtilityComponent', () => {
  let component: AngularUtilityComponent;
  let fixture: ComponentFixture<AngularUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
