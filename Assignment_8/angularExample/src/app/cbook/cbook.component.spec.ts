import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbookComponent } from './cbook.component';

describe('CbookComponent', () => {
  let component: CbookComponent;
  let fixture: ComponentFixture<CbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
