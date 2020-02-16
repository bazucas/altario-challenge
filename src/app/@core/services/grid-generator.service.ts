import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridGeneratorService {

  constructor() { }
  private time: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private grid: BehaviorSubject<string[][]> = new BehaviorSubject<[]>(null);
  private occurrences: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private letter: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public initialized = false;

  public letter$: Observable<string> = this.letter.asObservable();
  public time$: Observable<string> = this.time.asObservable();
  public grid$: Observable<string[][]> = this.grid.asObservable();
  public occurrences$: Observable<string> = this.occurrences.asObservable();

  private letterArray: string[] =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  private static testIfBiggerThanNine(value: number): number {
    if (value < 10) { return value; }
    return Math.round(value / 9);
  }

  private static getIndex(size: number) {
    return Math.floor(Math.random() * size);
  }

  public startGenerator(): void {
    this.initialized = true;
    setInterval( () => {
      // get machine clock - seconds with trailing zero
      const timeCalc = ('0' + new Date().getSeconds()).slice(-2);
      this.time.next(timeCalc);
    }, 1000);
    setInterval( () => {
      // push new grid after 2 seconds
      const grid = this.generateGrid(this.letter.value);
      this.grid.next(grid);
      this.getOccurrences();
    }, 2000);
  }

  public setLetter(letter?: string): void {
    if (this.letterArray.indexOf(letter) !== -1 || letter === '') {
      this.letter.next(letter);
    }
  }

  private generateGrid(letter?: string): string[][] {
    const grid: string[][] = [[], [], [], [], [], [], [], [], [], []];
    const indexes: [number, number][] = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let index;
        // if letter not set, generate random index and continue
        if (!letter || letter === '') {
          index = GridGeneratorService.getIndex(26);
          grid[i][j] = this.letterArray[index];
        } else {
          // if letter is set, create an entire grid without that letter, and then
          // just push that letter to 20 random not repeating positions
          const originalIndex = this.letterArray.indexOf(letter);
          do {
            // repeat until the new index is different from the selected letter index
            index = GridGeneratorService.getIndex(26);
          } while (originalIndex === index);
          grid[i][j] = this.letterArray[index];
        }
      }
    }
    if (letter && letter !== '') {
      // choose 20 random not repeated indexes to create a grid with 20% chosen letter occupancy
      while (indexes.length < 20) {
        const newIndex: [number, number] = [GridGeneratorService.getIndex(10), GridGeneratorService.getIndex(10)];
        if (!indexes.some(i => i[0].toString() + i[1].toString() === newIndex[0].toString() + newIndex[1].toString())) {
          indexes.push(newIndex);
        }
      }
      indexes.forEach(i => {
        grid[i[0]][i[1]] = letter;
      });
    }
    return grid;
  }
  public getOccurrences(): void {
    const firstLetter = this.grid.value[this.time.value[0]][this.time.value[1]];
    const secondLetter = this.grid.value[this.time.value[1]][this.time.value[0]];
    const firstLetterSum = this.searchForOccurrences(firstLetter);
    const secondLetterSum = this.searchForOccurrences(secondLetter);
    this.occurrences.next(firstLetterSum.toString() + secondLetterSum.toString());
  }

  private searchForOccurrences(letter: string): number {
    let sum = 0;
    this.grid.value.forEach(row => {
      const filteredRows = row.filter(x => x === letter);
      if (filteredRows.length > 0) {
        sum += filteredRows.reduce((acc: string, item: string) => acc + item).length;
      }
    });
    return GridGeneratorService.testIfBiggerThanNine(sum);
  }
}
