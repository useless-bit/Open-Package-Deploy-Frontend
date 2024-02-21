import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ApiService} from "../../service/api/api.service";

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


  constructor(private apiService: ApiService) {
  }

  testApi() {
    this.apiService.getAllAgents();
  }
}
