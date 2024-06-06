import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoGridComponent } from './processo-grid.component';

describe('ProcessoGridComponent', () => {
  let component: ProcessoGridComponent;
  let fixture: ComponentFixture<ProcessoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
