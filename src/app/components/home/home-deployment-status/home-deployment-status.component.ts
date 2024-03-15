import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {MatDivider} from "@angular/material/divider";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PackageEntity} from "../../../service/api/entity/packageEntity";
import {PackageApiService} from "../../../service/api/package.api.service";
import {DeploymentApiService} from "../../../service/api/deployment.api.service";
import {DeploymentEntity} from "../../../service/api/entity/deploymentEntity";

@Component({
  selector: 'app-home-deployment-status',
  standalone: true,
    imports: [
        LoadingComponent,
        MatDivider,
        MatFormField,
        MatInput
    ],
  templateUrl: './home-deployment-status.component.html',
  styleUrl: './home-deployment-status.component.scss'
})
export class HomeDeploymentStatusComponent implements OnInit {
  public dataLoaded: boolean = false;
  public deploymentCount: number = 0;
  public deploymentOutstandingCount: number = 0;
  public deploymentErrorCount: number = 0;
  public deploymentCompletedCount: number = 0;

  private deploymentEntities: DeploymentEntity[] = [];
  private deploymentEntitiesOutstanding: DeploymentEntity[] = [];
  private deploymentEntitiesError: DeploymentEntity[] = [];
  private deploymentEntitiesCompleted: DeploymentEntity[] = [];


  constructor(private deploymentApiService: DeploymentApiService) {
  }

  ngOnInit() {
    this.deploymentApiService.getAll().then(deploymentResponse => {
      if (deploymentResponse) {
        this.deploymentEntities = deploymentResponse.deployments;
        this.calculateDeployments()
        this.dataLoaded = true;
      }
    });
  }

  calculateDeployments(): void {
    this.deploymentCount = this.deploymentEntities.length;
    this.deploymentEntitiesError = this.deploymentEntities.filter(item => !item.isDeployed && item.lastDeploymentTime !== "N/A");
    this.deploymentErrorCount = this.deploymentEntitiesError.length;
    this.deploymentEntitiesOutstanding = this.deploymentEntities.filter(item => !item.isDeployed);
    this.deploymentOutstandingCount = this.deploymentEntitiesOutstanding.length;
    this.deploymentEntitiesCompleted = this.deploymentEntities.filter(item => item.isDeployed);
    this.deploymentCompletedCount = this.deploymentEntitiesCompleted.length;
  }

}
