import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarAtorComponent } from './pesquisar-ator.component';

describe('PesquisarAtorComponent', () => {
  let component: PesquisarAtorComponent;
  let fixture: ComponentFixture<PesquisarAtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisarAtorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisarAtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
