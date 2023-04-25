import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListsDesUtilisateursPage } from './lists-des-utilisateurs.page';

describe('ListsDesUtilisateursPage', () => {
  let component: ListsDesUtilisateursPage;
  let fixture: ComponentFixture<ListsDesUtilisateursPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsDesUtilisateursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListsDesUtilisateursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
