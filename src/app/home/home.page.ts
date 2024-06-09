import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';

import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';

import { ChallengeService, Result } from '../challenge.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonToast, IonListHeader, IonLabel]
})
export class HomePage {

  inpNum = ''
  result: Result | undefined

  constructor(
    private challengeService: ChallengeService,
  ) {
  }

  @ViewChild('inpNumControlTemplate')
  inpNumControl!: NgControl

  onSubmit() {
    this.result = undefined

    // Validate
    if (this.inpNum === '' || !Number.isInteger(this.inpNum)) {
      this.inpNumControl.control?.setErrors({})
      return
    }

    const num = Number(this.inpNum)
    this.result = this.challengeService.getResult(num)
  }

  reset() {
    this.result = undefined
    this.inpNumControl.control?.reset('')
  }
}
