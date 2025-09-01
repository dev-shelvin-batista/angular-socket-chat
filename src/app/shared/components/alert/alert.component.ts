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
   * Metodo para cerrar el modal de alerta. Se ejecuta primero un metodo que recibe el componente y despues se cierra el modal.
   *
   */
  async closeModal() {
    this.activeModal.close('Modal Closed');
  }

  async fnButtonOk() {
    await this.functionButtonOk();
    await this.closeModal();
  }

  async fnButtonCancel() {
    await this.functionButtonCancel();
    await this.closeModal();
  }
}
