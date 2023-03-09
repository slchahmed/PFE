import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjetInfoMobilePage } from './projet-info-mobile.page';

describe('ProjetInfoMobilePage', () => {
  let component: ProjetInfoMobilePage;
  let fixture: ComponentFixture<ProjetInfoMobilePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetInfoMobilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetInfoMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
