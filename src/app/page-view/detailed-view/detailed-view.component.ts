import { Component,Input,SimpleChanges,ChangeDetectorRef   } from '@angular/core';
import { SummaryViewService } from '../api/summary-view.service';
import { CommonModule } from '@angular/common';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,FormBuilder,FormGroup
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DetailedViewService } from '../api/detailed-view.service';

@Component({
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, MatFormFieldModule,MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,MatCardModule],
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent {

  @Input() selectedItem: any=[];
  samplingItems: any[] = [];
  form: FormGroup;
  id:any
  samplingTime:any

  constructor(private service:SummaryViewService,private fb: FormBuilder,private detailservice:DetailedViewService,private cdr: ChangeDetectorRef) { 
    this.form = this.fb.group({
      id:[''],
      samplingtime:[''],
      projectname: ['', [Validators.required]],
      constructioncount: [''],
      isconstructioncompleted: [''],
      roadlength: ['', Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItem'] && this.selectedItem) {

      this.id=this.selectedItem[1]
      const item = this.selectedItem[0]; 
      if (item) {
      this.samplingTime = item.samplingTime; 
      this.selectedItem = item;  
        this.getSamplingData(); 
        this.selectItem(this.selectedItem);
      }
    }
  }
  

  getSamplingData(): void {
    this.service.Get().subscribe(data => {
      this.samplingItems = data.datas;
    });
  }

  selectItem(item: any): void {
    this.selectedItem = item;  
    this.samplingTime = item.samplingTime;
    this.populateForm(item);
  
}

populateForm(item: any): void {
  const getVal = (label: string) =>
    item?.properties?.find((p: any) => p.label === label)?.value ?? '';

  this.form.setValue({
    id:this.id,
    samplingtime:this.samplingTime,
    projectname: getVal('Project Name'),
    constructioncount: getVal('Construction Count'),
    isconstructioncompleted: getVal('Is Construction Completed'),
    roadlength: getVal('Length of the road')
  });
}


Save() {
  const formData = this.form.value;
  const payload = {
    samplingTime: formData.samplingtime,
    properties: [
      { label: 'Project Name', value: formData.projectname },
      { label: 'Construction Count', value: formData.constructioncount },
      { label: 'Is Construction Completed', value: formData.isconstructioncompleted },
      { label: 'Length of the road', value: formData.roadlength }
    ]
  };
  if (this.form.valid) {
    this.detailservice.Post(payload).subscribe(
      (response) => {
        alert(response.message); 
        this.getSamplingData()
      },
      (error) => {
        alert('Error saving data');
      }
    );
  } else {
   // alert('Form is invalid');
  }
}

}
