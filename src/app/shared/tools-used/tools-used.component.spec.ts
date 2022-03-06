import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsUsedComponent } from './tools-used.component';

describe('ToolsUsedComponent', () => {
  let component: ToolsUsedComponent;
  let fixture: ComponentFixture<ToolsUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsUsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
