import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-meters-modal',
  templateUrl: './meters-modal.component.html',
  styleUrls: ['./meters-modal.component.css']
})
export class MetersModalComponent implements OnInit {
  isVisible:boolean = false;
  options = [
    { label: 'Virtual', value: 'Virtual' },
    { label: 'Fisico', value: 'Fisico' }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  

}
