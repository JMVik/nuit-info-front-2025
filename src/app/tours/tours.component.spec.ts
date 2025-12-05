import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursComponent } from './tours.component';

describe('ToursPageComponent', () => {
  let component: ToursComponent;
  let fixture: ComponentFixture<ToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('', () => {
    expect(component).toBeTruthy();
  });
});
