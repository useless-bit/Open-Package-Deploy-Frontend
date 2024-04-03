import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {PlaceholderComponent} from "../../placeholder/placeholder.component";
import {HomePackageStatusComponent} from "../home-package-status/home-package-status.component";
import {HomeDeploymentStatusComponent} from "../home-deployment-status/home-deployment-status.component";
import {HomeAgentStatusComponent} from "../home-agent-status/home-agent-status.component";

@Component({
  selector: 'app-home-overview',
  standalone: true,
  imports: [
    MatCard,
    PlaceholderComponent,
    HomePackageStatusComponent,
    HomeDeploymentStatusComponent,
    HomeAgentStatusComponent,
  ],
  templateUrl: './home-overview.component.html',
  styleUrl: './home-overview.component.scss'
})
export class HomeOverviewComponent {

}
