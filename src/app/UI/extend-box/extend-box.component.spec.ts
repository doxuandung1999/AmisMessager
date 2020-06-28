import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendBoxComponent } from './extend-box.component';

describe('ExtendBoxComponent', () => {
  let component: ExtendBoxComponent;
  let fixture: ComponentFixture<ExtendBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
