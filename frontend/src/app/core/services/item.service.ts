import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export default class ItemService {

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

    getItemsPag(offset: number, limit: number, categ: string, search: string, filtering: boolean, filters: {}): Observable<any> {
      
      let params = new HttpParams({fromObject: filters})
      .set('offset', offset)
      .set('limit', limit)
      .set('categ', categ)
      .set('search', search)
      .set('filtering', filtering);

      return this.http.get(environment.urlItems + '/pag/', {params});
    }

    favorite(slug: string): Observable<any> {
      return this.http.post(environment.urlItems + '/fav/', {slug});
    }

    unfavorite(slug: string): Observable<any> {
      return this.http.delete(environment.urlItems + '/fav/' + slug);
    }

  }

