import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLoginComponent } from './info-login.component';

describe('InfoLoginComponent', () => {
  let component: InfoLoginComponent;
  let fixture: ComponentFixture<InfoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoLoginComponent]
    });
    fixture = TestBed.createComponent(InfoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
