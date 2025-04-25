import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailedViewService {

  private apiUrl = `${environment.apiurl}/update`;

constructor(private http: HttpClient) { }

Post(formData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, formData);
}
}
