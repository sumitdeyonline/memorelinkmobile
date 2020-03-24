import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListjobComponent } from './listjob.component';

describe('ListjobComponent', () => {
  let component: ListjobComponent;
  let fixture: ComponentFixture<ListjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListjobComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
