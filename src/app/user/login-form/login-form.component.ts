import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [ 
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
    ])
  ]
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  pageType: "signIn" | "createAcc" | "forgotPass" = "signIn";
  floatLabelControl = new FormControl('always');
  

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      "email": [
        "", 
        [Validators.required, Validators.email]
      ],
      "password": [
        "", 
        [Validators.required, Validators.minLength(8)]
      ],
      "confPassword": ["", []],
    });
  }

  get getEmail() {
    return this.form.get("email")!;
  }

  get getPassword() {
    return this.form.get("password")!;
  }
  get getConfPassword() {
    return this.form.get("confPassword")!;
  }


  get isSignInPage() {
    return this.pageType === "signIn";
  }

  get isCreateAccPage() {
    return this.pageType === "createAcc";
  }

  get isForgotPassPage() {
    return this.pageType === "forgotPass";
  }

  changePageType(pageType: "signIn" | "createAcc" | "forgotPass" = "signIn") {
    this.pageType = pageType;
  }


  async submitForm() {

  }
}
