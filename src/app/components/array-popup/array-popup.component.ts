import {Component, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ArrayPopupInput} from "./arrayPopupInput";

@Component({
  selector: 'app-array-popup',
  standalone: true,
  imports: [],
  templateUrl: './array-popup.component.html',
  styleUrl: './array-popup.component.scss'
})
export class ArrayPopupComponent implements OnChanges {
  constructor(@Inject(MAT_DIALOG_DATA) public arrayPopupInput: ArrayPopupInput) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
