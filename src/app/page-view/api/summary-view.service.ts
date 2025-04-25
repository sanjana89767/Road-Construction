import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummaryViewService {
  
  private apiUrl = `${environment.apiurl}/Get`; 

constructor(private http: HttpClient) { }

Get(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

}
