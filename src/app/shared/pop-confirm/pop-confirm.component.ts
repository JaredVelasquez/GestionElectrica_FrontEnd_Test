import { Component, Input, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorI } from 'src/Core/interfaces/error.interface';

@Component({
  selector: 'app-pop-confirm',
  templateUrl: './pop-confirm.component.html',
  styleUrls: ['./pop-confirm.component.css']
})
export class PopConfirmComponent implements OnInit {
  //@Input() ERROR: ErrorI = {id: 0, content: '', solution: ''};
  
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit(): void {
  }

}
