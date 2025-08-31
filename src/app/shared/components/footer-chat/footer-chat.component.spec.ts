import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterChatComponent } from './footer-chat.component';

describe('FooterChatComponent', () => {
  let component: FooterChatComponent;
  let fixture: ComponentFixture<FooterChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
