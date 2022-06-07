import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarHistoricoPage } from './visualizar-historico.page';

describe('VisualizarHistoricoPage', () => {
  let component: VisualizarHistoricoPage;
  let fixture: ComponentFixture<VisualizarHistoricoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarHistoricoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarHistoricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
