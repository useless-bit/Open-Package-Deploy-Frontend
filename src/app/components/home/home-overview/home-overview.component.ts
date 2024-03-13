import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {HomeOutdatedAgentsComponent} from "../home-outdated-agents/home-outdated-agents.component";

@Component({
  selector: 'app-home-overview',
  standalone: true,
  imports: [
    MatCard,
    PlaceholderComponent,
    HomeOutdatedAgentsComponent
  ],
  templateUrl: './home-overview.component.html',
  styleUrl: './home-overview.component.scss'
})
export class HomeOverviewComponent {

}
