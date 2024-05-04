import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalitikComponent } from './analitik.component';

describe('AnalitikComponent', () => {
  let component: AnalitikComponent;
  let fixture: ComponentFixture<AnalitikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalitikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalitikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
