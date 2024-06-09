import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';

import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonList, IonItem, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, IonToast, IonListHeader, IonLabel]
})
export class HomePage {

  inpNum = ''
  result: any | undefined

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
    this.result = this.getResult(num)
  }

  reset() {
    this.result = undefined
    this.inpNumControl.control?.reset('')
  }

  private getResult(num: number): Result {
    return {
      list: this.getList(num).join(', '),
      multiples3: this.getMultiples(3, num).join(', '),
      multiples5: this.getMultiples(5, num).join(', '),
      multiples7: this.getMultiples(7, num).join(', '),
      listWithColors: this.getListWithColors(num),
    };
  }

  private getList(limit: number) {
    const list: number[] = []
    for (let i = 0; i <= limit; i++) {
      list.push(i)
    }
    return list
  }

  private getMultiples(num: number, limit: number) {
    const list: number[] = []
    for (let i = 0; i <= limit; i += num) {
      list.push(i)
    }
    return list
  }

  private getListWithColors(limit: number) {
    const list: ListWithColorsItem[] = []
    for (let i = 0; i <= limit; i++) {
      const item: ListWithColorsItem = { num: i, colorPrimary: '#000000', colorSecondary: '#e6e6e6' } // Initialize with default color.
      // Revisar las condiciones del menor valor al mayor tiene el efecto de seleccionar el color del menor múltiplo.
      if (i % 3 === 0) {
        item.colorPrimary = '#666666'
        item.colorSecondary = '#e2f8e8'
      } else if (i % 5 === 0) {
        item.colorPrimary = '#a91e1e'
        item.colorSecondary = '#ffdcdc'
      } else if (i % 7 === 0) {
        item.colorPrimary = '#0f58bd'
        item.colorSecondary = '#ddedfd'
      }
      list.push(item)
    }
    return list
  }
}

interface Result {
  list: string;
  multiples3: string;
  multiples5: string;
  multiples7: string;
  listWithColors: ListWithColorsItem[];
}

interface ListWithColorsItem {
  num: number;
  colorPrimary: string;
  colorSecondary: string;
}
