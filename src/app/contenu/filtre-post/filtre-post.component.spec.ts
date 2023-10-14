import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrePostComponent } from './filtre-post.component';

describe('FiltrePostComponent', () => {
  let component: FiltrePostComponent;
  let fixture: ComponentFixture<FiltrePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrePostComponent]
    });
    fixture = TestBed.createComponent(FiltrePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
