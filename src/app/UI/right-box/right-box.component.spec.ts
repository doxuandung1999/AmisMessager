import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightBoxComponent } from './right-box.component';

describe('RightBoxComponent', () => {
  let component: RightBoxComponent;
  let fixture: ComponentFixture<RightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
