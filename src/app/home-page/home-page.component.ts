import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  

  ngOnInit() {
  }

  title = 'StackFusion';
  exampleForm = new FormGroup ({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    date: new FormControl(),

  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router) {
    this.createForm();
   } 

  createForm() {
    const emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneNumberPattern = "^[0-9]{10}$";

    this.exampleForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      phone: [null, [Validators.required, Validators.pattern(phoneNumberPattern)]],
      date: [null, Validators.required],
    });
  }
  postFormUrl = environment.backendUrl +  'user-form/'
  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>(this.postFormUrl, data);
  }

  get email() {
    return this.exampleForm.get('email');
  }

  get name() {
    return this.exampleForm.get('name');
  }
  
  get date() {
    return this.exampleForm.get('date');
  }

  get phone() {
    return this.exampleForm.get('phone');
  }
  onClickSubmit(formControl){
    const data = {
      'name':formControl['name'].value,
      'mobile':formControl['phone'].value,
      'date_of_birth':formControl['date'].value,
      'email':formControl['email'].value
    }
    
    
    this.sendPostRequest(data).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      err => {
        console.log('some err', err);
        
      }
);
  }
}





