import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

    getCategories(offset: number, limit: number): Observable<any> {
      let params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);

      return this.http.get(environment.urlCategories, {params});
    }
    
    getAllCategories() {
      return this.http.get(environment.urlCategories + '/all/');
    }
}
