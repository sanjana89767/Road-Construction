import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailedViewComponent } from '../detailed-view/detailed-view.component';
import { SummaryViewComponent } from '../summary-view/summary-view.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatTabsModule,DetailedViewComponent,SummaryViewComponent,RouterModule,CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('summaryView') summaryView: any;
  constructor() { }

  ngOnInit() {
    this.selectedItem = null;
  }
  
  selectedTabIndex: number = 0;  
  selectedItem: any = {}; 

  handleSelected(samplingTime: any) {
    this.selectedItem = samplingTime; 
    this.selectedTabIndex = 1;
  }

  onTabChange(event: any): void {
    if (event.index === 0) {
      this.summaryView.getdata(); 
    }
  }
  

}
