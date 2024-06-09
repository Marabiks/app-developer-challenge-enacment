import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  getResult(num: number): Result {
    const result = this.getResultInner(num)
    this.firebaseService.saveRequest({
      input: num,
      result: result,
    })
    return result
  }

  private getResultInner(num: number): Result {
    return {
      list: this.getList(num).join(', '),
      multiples3: this.getMultiples(3, num).join(', '),
      multiples5: this.getMultiples(5, num).join(', '),
      multiples7: this.getMultiples(7, num).join(', '),
      listWithColors: this.getListWithColors(num),
    }
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

export interface Request {
  input: number;
  result: Result;
}

export interface Result {
  list: string;
  multiples3: string;
  multiples5: string;
  multiples7: string;
  listWithColors: ListWithColorsItem[];
}

export interface ListWithColorsItem {
  num: number;
  colorPrimary: string;
  colorSecondary: string;
}
