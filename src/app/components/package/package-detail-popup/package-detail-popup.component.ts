import {Component, Inject} from '@angular/core';
import {AgentDetailComponent} from "../../agent/agent-detail/agent-detail.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PackageDetailComponent} from "../package-detail/package-detail.component";
import {PackageCreateDeploymentComponent} from "../package-create-deployment/package-create-deployment.component";

@Component({
  selector: 'app-package-detail-popup',
  standalone: true,
  imports: [
    AgentDetailComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PlaceholderComponent,
    NgSwitch,
    ReactiveFormsModule,
    PackageDetailComponent,
    PackageCreateDeploymentComponent
  ],
  templateUrl: './package-detail-popup.component.html',
  styleUrl: './package-detail-popup.component.scss'
})
export class PackageDetailPopupComponent {
  fontStyleControl = new FormControl("page_one");

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
