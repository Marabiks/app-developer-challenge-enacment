import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { Database, connectDatabaseEmulator, getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db: Database

  constructor() {
    this.db = this.getDb()
  }

  private getDb() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDRET9vskScvnmBPW6EXDcg85KDtVvtFBM',
      authDomain: 'appdeveloperchallengeenacment.firebaseapp.com',
      databaseURL: 'https://appdeveloperchallengeenacment-default-rtdb.firebaseio.com',
      projectId: 'appdeveloperchallengeenacment',
      storageBucket: 'appdeveloperchallengeenacment.appspot.com',
      messagingSenderId: '70715764741',
      appId: '1:70715764741:web:f97d3c3b0251dde02fec6c',
    }
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)
    if (location.hostname === 'localhost') {
      // Point to the RTDB emulator running on localhost.
      connectDatabaseEmulator(db, '127.0.0.1', 9000)
    }
    return db
  }
}
