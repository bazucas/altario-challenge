import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {GridGeneratorService} from '../../../@core/services/grid-generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorComponent {
  @ViewChild('input', { static: false }) public input: ElementRef | undefined;
  public disabled = true;

  constructor(
    public gridGeneratorService: GridGeneratorService) { }

  public trackByFn(index: number) {
    return index;
  }

  public generateGrid(): void {
    this.disabled = false;
    if (!this.gridGeneratorService.initialized) {
      this.gridGeneratorService.startGenerator();
    }
    this.gridGeneratorService.setLetter(this.input.nativeElement.value);
  }

  public updateGrid(): void {
    this.disabled = true;
    this.gridGeneratorService.setLetter(this.input.nativeElement.value);
    setTimeout(() => this.disabled = false, 4000);
  }
}
