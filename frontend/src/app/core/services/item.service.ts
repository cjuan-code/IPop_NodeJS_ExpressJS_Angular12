import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private http: HttpClient) {}
    getItems(): Observable<any> {
      // console.log(this.http.get(environment.url));
      return this.http.get(environment.urlItems);
    }

    getItemsByCat(categ: string): Observable<any> {
      return this.http.get(environment.urlItems + "/cat/" + categ);
    }

    getItem(slug: string): Observable<any> {
      return this.http.get(environment.urlItems + '/' + slug);
    }
  }

