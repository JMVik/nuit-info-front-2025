import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneteComponentComponent } from './planete-component.component';

describe('PlaneteComponentComponent', () => {
  let component: PlaneteComponentComponent;
  let fixture: ComponentFixture<PlaneteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaneteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
