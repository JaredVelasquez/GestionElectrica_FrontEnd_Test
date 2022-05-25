import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private message: NzMessageService) {}

  createMessage(type: string, message: string): void {
    this.message.create(type, `This is a message of ${message}`);
  }

}
