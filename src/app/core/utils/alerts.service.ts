import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private modalService: NgbModal
  ) { }

  /**
   * Metodo para generar un modal como alerta.
   *
   * @param   {string}    title           Titulo a mostrar
   * @param   {string}    description     Descripcion
   * @param   {string}    textButtonOk      Texto del botón Aceptar
   * @param   {Function}  functionButtonOk  Metodo a ejecutarse en el evento clic del boton Aceptar del modal antes de cerrarse
   * @param   {string}    textButtonCancel      Texto del botón Cancelar
   * @param   {Function}  functionButtonCancel  Metodo a ejecutarse en el evento clic del boton Aceptar del modal antes de cerrarse
   *
   */
  openAlert = (title:string, description: string, textButtonOk = '', functionButtonOk: Function = () => {}, textButtonCancel = '', functionButtonCancel: Function = () => {}) => {
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.textButtonOk = textButtonOk;
    modalRef.componentInstance.functionButtonOk = functionButtonOk;
    modalRef.componentInstance.textButtonCancel = textButtonCancel;
    modalRef.componentInstance.functionButtonCancel = functionButtonCancel;
  }
}
