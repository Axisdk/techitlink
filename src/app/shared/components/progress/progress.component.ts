import {Component, Input, OnInit} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    imports: [
        NgClass
    ]
})

export class ProgressComponent implements OnInit {

  @Input() value!: number

  public maxValue: number = 100
  public progressClass!: string

  constructor() {}

  private initProgress() {
    if (!this.value) return

    if (this.value < 50) {
      this.progressClass = 'progress-flat-error'
    }
    else if (this.value >= 50 && this.value < 70) {
        this.progressClass = 'progress-flat-warning'
    }
    else if (this.value >= 70 && this.value < 90) {
      this.progressClass = 'progress-flat-primary'
    }
    else if (this.value >= 90 && this.value <= 100) {
      this.progressClass = 'progress-flat-success'
    } else {
      return
    }
  }

  ngOnInit(): void {
    this.initProgress()
  }

}
