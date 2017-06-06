import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropitemComponent } from './cropitem.component';

describe('CropitemComponent', () => {
  let component: CropitemComponent;
  let fixture: ComponentFixture<CropitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
