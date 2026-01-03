import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaengelLayerComponent } from './maengel-layer.component';

describe('MaengelLayerComponent', () => {
  let component: MaengelLayerComponent;
  let fixture: ComponentFixture<MaengelLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaengelLayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaengelLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
