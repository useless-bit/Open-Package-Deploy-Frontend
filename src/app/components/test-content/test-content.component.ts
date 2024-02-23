import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-test-content',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './test-content.component.html',
  styleUrl: './test-content.component.scss'
})
export class TestContentComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.agentUUID)
  }
}
