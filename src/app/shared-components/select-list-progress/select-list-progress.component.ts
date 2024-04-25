import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {LoadingComponent} from "../../components/loading/loading.component";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {SelectListProgressData} from "./selectListProgressData";
import {SelectListItem} from './selectListItem';

@Component({
  selector: 'app-select-list-progress',
  standalone: true,
  imports: [
    LoadingComponent,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatListOption,
    MatProgressBar,
    MatSelectionList,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf
  ],
  templateUrl: './select-list-progress.component.html',
  styleUrl: './select-list-progress.component.scss'
})
export class SelectListProgressComponent implements OnInit {
  @Input() public selectListProgressData!: SelectListProgressData;
  @Input() public progressFunction!: Function;
  @Input() public progressCompletedFunction!: Function;

  public dataLoaded: boolean = false;
  public selectableItems: SelectListItem[] = [];
  public selectedItems: SelectListItem[] = [];
  public selectedItemProcessingStarted: boolean = false;
  public processedItems: number = 0;
  public itemProcessingStatus: string[] = [];


  constructor(private changeDetector: ChangeDetectorRef,
              public selectListProgressComponentMatDialogRef: MatDialogRef<SelectListProgressComponent>) {
  }

  ngOnInit() {
    this.selectableItems = this.selectListProgressData.items;
    this.dataLoaded = true;
  }

  changeSelectedItems(event: boolean, itemUUID: string) {
    if (event) {
      let itemEntity = this.selectListProgressData.items.filter(item => item.uuid == itemUUID).at(0);
      if (itemEntity && this.selectedItems.filter(item => item.uuid == itemUUID).length == 0) {
        this.selectedItems?.push(itemEntity);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(item => item.uuid !== itemUUID);
    }
  }

  async processSelectedItems() {
    this.selectListProgressComponentMatDialogRef.disableClose = true;
    this.processedItems = 0;
    this.selectedItemProcessingStarted = true;
    this.itemProcessingStatus = [];
    for (let selectedGroup of this.selectedItems) {
      let returnValue = await this.progressFunction(selectedGroup);
      if (returnValue) {
        this.itemProcessingStatus.push(selectedGroup.name + " | " + selectedGroup.uuid + " -> " + returnValue);
      } else {
        this.itemProcessingStatus.push(selectedGroup.name + " | " + selectedGroup.uuid + " -> " + this.selectListProgressData.stepThreeInfoSuccessText);
      }
      this.processedItems = Math.round(100 * (this.itemProcessingStatus.length / this.selectedItems.length));
    }
    await this.progressCompletedFunction();
    this.selectListProgressComponentMatDialogRef.disableClose = false;
    this.selectedItemProcessingStarted = false;
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.selectableItems = this.selectListProgressData.items.filter(item => item.uuid.toLowerCase().includes(filterValue.trim().toLowerCase()) || item.name.toLowerCase().includes(filterValue.trim().toLowerCase()))
    this.changeDetector.detectChanges();
  }

  addVisibleEntries() {
    let agentsToAdd = this.selectableItems.filter(item => !this.selectedItems.includes(item));
    this.selectedItems = this.selectedItems.concat(agentsToAdd);
    this.changeDetector.detectChanges();

  }

  removeVisibleEntries() {
    this.selectedItems = this.selectedItems.filter(item => !this.selectableItems.includes(item));
    this.changeDetector.detectChanges();

  }

  isEntryInSelectedList(groupUUID: string): boolean {
    return this.selectedItems.filter(item => item.uuid === groupUUID).length > 0;
  }

}
