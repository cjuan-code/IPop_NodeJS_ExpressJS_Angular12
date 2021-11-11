import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor (private http: HttpClient, private jwtService: JwtService) {}

  add(slug: any, payload: any, valoration: Number): Observable<any> {
    return this.http.post(environment.urlItems + '/comment/', {comment: {content: payload, slug: slug, valoration: valoration}});
  }
  
  remove(commentId: any, slug: any, reviewId: any): Observable<any> {
    return this.http.delete(environment.urlItems + '/comment/' + commentId + '/' + slug + '/' + reviewId);
  }

}