import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsistenteFormComponent } from './nuevo-asistente-form.component';

describe('NuevoAsistenteFormComponent', () => {
  let component: NuevoAsistenteFormComponent;
  let fixture: ComponentFixture<NuevoAsistenteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAsistenteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAsistenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
