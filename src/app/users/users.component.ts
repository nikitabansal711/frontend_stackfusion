import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
  ) { }

  users ;
  ngOnInit() {
    this.sendPostRequest().subscribe(
      res => {
        console.log(res.users);
        this.users = res.users
        
      },
      err => {
        console.log('some err', err);
        
      }
  );
  
  }
  userListUrl = environment.backendUrl + 'get-all-users/'
  sendPostRequest(): Observable<any> {
    return this.httpClient.get<any>(this.userListUrl);
  }

  
  
}
