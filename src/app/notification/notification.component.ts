import { Component, OnInit } from '@angular/core';

import { NotificationService } from './notification.service';
import { Alert, AlertType } from './notification.type';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  message: string = "";
  showNotification: Boolean = false;
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getAlert().subscribe(
      (alert: Alert) => {
        if (alert) {
          this.showNotification = true;
          this.message = alert.message;
        }
        console.log("alert", alert);
      }
    );
  }

  removeAlert() {
    this.showNotification = false;
    this.message = "";
    this.notificationService.clear();
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }

}
