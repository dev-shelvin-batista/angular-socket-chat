import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  db: Storage = null as unknown as Storage;  

  constructor() { }

  /**
   * Method for connecting to local storage. In addition, values are initialized if they have not been created, and initial values for states are created.
   * @returns Promise with local storage data
   */
  connectDB = async(): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        this.db = localStorage;

        // Check if the values exist in the browser's local storage to initialize them. This happens when the app is opened for the first time.
        if(this.db.getItem("userNameAngular") === '[]' || this.db.getItem("userNameAngular") === null){
          this.db.setItem("userNameAngular", "");
        }
        if(this.db.getItem("list_usersAngular") === '[]' || this.db.getItem("list_usersAngular") === null){
          this.db.setItem("list_usersAngular", JSON.stringify([]));
        }
        resolve(this.db);     
      } catch (e) {
        resolve(null)
      }
    });
  }
}
