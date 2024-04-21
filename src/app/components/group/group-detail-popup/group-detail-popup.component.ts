import {Component, Inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {
    PackageCreateDeploymentComponent
} from "../../package/package-create-deployment/package-create-deployment.component";
import {PackageDetailComponent} from "../../package/package-detail/package-detail.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupDetailComponent} from "../group-detail/group-detail.component";

@Component({
  selector: 'app-group-detail-popup',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    NgSwitchCase,
    PackageCreateDeploymentComponent,
    PackageDetailComponent,
    ReactiveFormsModule,
    NgSwitch,
    GroupDetailComponent
  ],
  templateUrl: './group-detail-popup.component.html',
  styleUrl: './group-detail-popup.component.scss'
})
export class GroupDetailPopupComponent {
  fontStyleControl = new FormControl("page_one");

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
