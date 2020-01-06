import { Component, OnInit } from '@angular/core';
import {Subject, zip} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessagebarService} from "../../services/messagebar.service";

@Component({
  selector: 'app-messagebar',
  templateUrl: './messagebar.component.html',
  styleUrls: ['./messagebar.component.scss']
})
export class MessagebarComponent implements OnInit {
  showMessage$ = new Subject();

  constructor(private snackBar: MatSnackBar, private messageBarService: MessagebarService) {
    zip(
      this.showMessage$,
      this.messageBarService.getMessage()
    ).subscribe((res) => {
      this.snackBar.open(res[1]['message'], 'Ok', { duration: 3000})
          .afterDismissed()
          .subscribe(() => {
            this.showMessage$.next(1);
          });
      });

    this.showMessage$.next(1);
  }

  ngOnInit() {}
}
