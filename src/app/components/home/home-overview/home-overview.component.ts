import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {HomeAgentOnlineComponent} from "../home-online-agents/home-agent-online.component";
import {HomeAgentOutdatedComponent} from "../home-outdated-agents/home-agent-outdated.component";

@Component({
  selector: 'app-home-overview',
  standalone: true,
  imports: [
    MatCard,
    PlaceholderComponent,
    HomeAgentOnlineComponent,
    HomeAgentOutdatedComponent,
  ],
  templateUrl: './home-overview.component.html',
  styleUrl: './home-overview.component.scss'
})
export class HomeOverviewComponent {

}
