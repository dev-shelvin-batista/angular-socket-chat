import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: false
})
export class AlertComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() title:string = '';
  @Input() description: string = '';
  @Input() textButtonOk: string = '';
  @Input() textButtonCancel: string = '';
  @Input() functionButtonOk: Function = () => {}
  @Input() functionButtonCancel: Function = () => {}

  /**
   * Method to close the alert modal. First, a method that receives the component is executed, and then the modal is closed.
   *
   */
  async closeModal() {
    this.activeModal.close('Modal Closed');
  }

  /**
   * Method to execute the function of the OK button sent as a parameter to the component
   */
  async fnButtonOk() {
    await this.functionButtonOk();
    await this.closeModal();
  }

  /**
   * Method to execute the cancel button function sent as a parameter to the component
   */
  async fnButtonCancel() {
    await this.functionButtonCancel();
    await this.closeModal();
  }
}
