import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import {GeneratorService} from '../../../@core/services/generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratorComponent implements OnInit {
  @ViewChild('input', { static: false }) public input: ElementRef | undefined;

  constructor(
    public generatorService: GeneratorService) { }

  public ngOnInit(): void {
    this.generatorService.inputDisabled.next(true);
  }

  public trackByFn(index: number) {
    return index;
  }

  public generateGrid(): void {
    this.generatorService.inputDisabled.next(false);
    if (!this.generatorService.initialized) {
      this.generatorService.startGenerator();
    }
    this.generatorService.setLetter(this.input.nativeElement.value);
  }

  public updateGrid(): void {
    this.generatorService.setLetter(this.input.nativeElement.value);
    this.generatorService.inputDisabled.next(true);
  }
}
