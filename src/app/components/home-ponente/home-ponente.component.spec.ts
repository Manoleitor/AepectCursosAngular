import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePonenteComponent } from './home-ponente.component';

describe('HomePonenteComponent', () => {
  let component: HomePonenteComponent;
  let fixture: ComponentFixture<HomePonenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePonenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePonenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
