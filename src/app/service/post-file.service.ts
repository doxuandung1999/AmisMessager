import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FileSave} from "../model/file/file";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostFileService {

  constructor(private route: Router,
    private http: HttpClient) { }


  saveFile(file : FileSave) {
    
    return this.http.post(`${environment.apiUrl}/api/Files/upFile`, file);
  }

  getFileById(convid: any) {
    return this.http.get<FileSave>(`${environment.apiUrl}/api/Files/${convid}`);
}

}
