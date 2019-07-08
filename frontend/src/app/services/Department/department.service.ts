import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
     return this.http.get<Department[]>(`${this.url}department/getDepartments`);
    //  .subscribe(
    //     a => {
    //       console.log(a);
    //       dep = a as Department[];
    //     },
    //     err => console.error('Observer got an error: ' + err),
    //     () => {
    //       console.log('Observer got a complete notification');
    //       return dep;
    //     }
    //  );
  }

}
 