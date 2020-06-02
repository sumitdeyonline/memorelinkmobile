import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobpredictioncomponentComponent } from './jobpredictioncomponent.component';

describe('JobpredictioncomponentComponent', () => {
  let component: JobpredictioncomponentComponent;
  let fixture: ComponentFixture<JobpredictioncomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpredictioncomponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobpredictioncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
