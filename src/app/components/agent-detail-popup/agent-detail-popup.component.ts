import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AgentDetailComponent} from "../agent-detail/agent-detail.component";
import {PlaceholderComponent} from "../placeholder/placeholder.component";
import {MatStep, MatStepContent, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-agent-detail-popup',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    AgentDetailComponent,
    PlaceholderComponent,
    MatStepper,
    MatStep,
    MatStepContent,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './agent-detail-popup.component.html',
  styleUrl: './agent-detail-popup.component.scss'
})
export class AgentDetailPopupComponent {
  fontStyleControl = new FormControl("page_one");

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
