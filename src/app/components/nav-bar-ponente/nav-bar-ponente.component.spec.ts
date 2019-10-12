import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarPonenteComponent } from './nav-bar-ponente.component';

describe('NavBarPonenteComponent', () => {
  let component: NavBarPonenteComponent;
  let fixture: ComponentFixture<NavBarPonenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarPonenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarPonenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
