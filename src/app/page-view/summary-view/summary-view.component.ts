import { Component, OnInit, EventEmitter, Output,SimpleChanges } from '@angular/core';
import { SummaryViewService } from '../api/summary-view.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  imports: [CommonModule,MatTabsModule],
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css']
})
export class SummaryViewComponent implements OnInit {

  summarydata: any[] = [];
  headers: string[] = [];
  selectedSamplingTime: any
  id:any;
  selectedRow: any;
  @Output() samplingSelected = new EventEmitter<any>();

  constructor(private service:SummaryViewService) { }


  ngOnInit() {
   this.getdata()
  }

  getdata(){
      this.service.Get().subscribe(data => {
        this.summarydata = data.datas;
        console.log(this.summarydata)
         this.id=data.id;
        if (this.summarydata.length > 0) {
          this.headers = ['Sampling Time', ...this.summarydata[0].properties.map((p: { label: any; }) => p.label)];
        }
        
      });
    
  }

  selectSamplingTime(samplingTime: string): void {
    const id = this.id;
    this.selectedSamplingTime = this.selectedSamplingTime === samplingTime ? null : samplingTime;
    this.samplingSelected.emit([samplingTime, id]);
  }

}
