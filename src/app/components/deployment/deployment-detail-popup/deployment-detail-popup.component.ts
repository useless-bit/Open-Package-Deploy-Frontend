import {Component, Inject} from '@angular/core';
import {AgentDetailComponent} from "../../agent/agent-detail/agent-detail.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DeploymentDetailComponent} from "../deployment-detail/deployment-detail.component";

@Component({
  selector: 'app-deployment-detail-popup',
  standalone: true,
  imports: [
    AgentDetailComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PlaceholderComponent,
    ReactiveFormsModule,
    NgSwitch,
    DeploymentDetailComponent
  ],
  templateUrl: './deployment-detail-popup.component.html',
  styleUrl: './deployment-detail-popup.component.scss'
})
export class DeploymentDetailPopupComponent {
  fontStyleControl = new FormControl("page_one");

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
