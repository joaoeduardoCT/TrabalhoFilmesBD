import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmeComponent } from './add-filme.component';

describe('AddFilmeComponent', () => {
  let component: AddFilmeComponent;
  let fixture: ComponentFixture<AddFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFilmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
