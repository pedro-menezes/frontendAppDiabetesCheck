import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RealizarLancamentoPage } from './realizar-lancamento.page';

describe('RealizarLancamentoPage', () => {
  let component:RealizarLancamentoPage;
  let fixture: ComponentFixture<RealizarLancamentoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarLancamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RealizarLancamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
