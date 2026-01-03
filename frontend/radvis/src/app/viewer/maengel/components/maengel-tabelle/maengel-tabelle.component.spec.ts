import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaengelTabelleComponent } from './maengel-tabelle.component';

describe('MaengelTabelleComponent', () => {
  let component: MaengelTabelleComponent;
  let fixture: ComponentFixture<MaengelTabelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaengelTabelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaengelTabelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
