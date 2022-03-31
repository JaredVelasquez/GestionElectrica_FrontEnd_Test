import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SpinnerLoaderServiceService } from '@shared/services/spinner-loader-service.service';

@Component({
  selector: 'app-spinner-loader-superimposed',
  templateUrl: './spinner-loader-superimposed.component.html',
  styleUrls: ['./spinner-loader-superimposed.component.css']
})
export class SpinnerLoaderSuperimposedComponent implements OnInit, OnChanges {
  @Output() disableSpiner : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() triger: boolean = true;
  constructor(
    private spinerService: SpinnerLoaderServiceService
  ) { }

  ngOnInit( ): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.triger){
      this.disableSpiner.emit(false);
    }
    this.triger = true;
  }

}
