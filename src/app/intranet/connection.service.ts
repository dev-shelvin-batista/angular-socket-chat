import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  db: Storage = null as unknown as Storage;  

  constructor() { }

  /**
   * Método para realizar la conexión al local storage. Además se inician los valores si no estan creados y se crean los valores iniciales de los estados.
   * @returns Promesa con los datos del local storage
   */
  connectDB = async(): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        this.db = localStorage;

        // Verificar si existen los valores en el local storage del navegador para inicializarlos. Esto sucede cuando se abre la app por primera vez
        if(this.db.getItem("userName") === '[]' || this.db.getItem("userName") === null){
          this.db.setItem("userName", "");
        }
        if(this.db.getItem("listado_usuarios") === '[]' || this.db.getItem("listado_usuarios") === null){
          this.db.setItem("listado_usuarios", JSON.stringify([]));
        }
        resolve(this.db);     
      } catch (e) {
        resolve(null)
      }
    });
  }
}
