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
   * Method for generating a modal as an alert.
   *
   * @param   {string}    title           Title to display
   * @param   {string}    description     Description
   * @param   {string}    textButtonOk      Text on the Accept button
   * @param   {Function}  functionButtonOk  Method to be executed when the OK button in the modal is clicked before closing
   * @param   {string}    textButtonCancel      Cancel button text
   * @param   {Function}  functionButtonCancel  Method to be executed when the OK button in the modal is clicked before closing.
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
