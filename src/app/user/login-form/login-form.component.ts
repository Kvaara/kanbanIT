import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/services/snack.service';


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
    ]),
    trigger("popUp", [
      transition(":enter", [
        style({transform: 'scale(1)'}),
        animate(100, style({transform: 'scale(1.1)'}))
      ])
    ]),
  ]
})
export class LoginFormComponent implements OnInit {
  @Input() hasAuthModuleLoaded: boolean = false;
  signInForm!: FormGroup;
  createAccForm!: FormGroup;
  resetPassForm!: FormGroup;
  pageType: "signIn" | "createAcc" | "forgotPass" = "signIn";
  floatLabelControl = new FormControl('always');
  errorText: string = "";
  successText: string = "";
  isSubmitting = false;
  

  constructor(
    public afAuth: AngularFireAuth, 
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      "email": [
        "", 
        [Validators.required, Validators.email]
      ],
      "password": [
        "", 
        [Validators.required, Validators.minLength(8)]
      ],
    });

    this.createAccForm = this.fb.group({
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

    this.resetPassForm = this.fb.group({
      "email": [
        "",
        [Validators.required, Validators.email]
      ]
    });
  }

  get getSignInEmail() {
    return this.signInForm.get("email")!;
  }

  get getSignInPassword() {
    return this.signInForm.get("password")!;
  }


  get getCreateAccEmail() {
    return this.createAccForm.get("email")!;
  }
  get getCreateAccPassword() {
    return this.createAccForm.get("password")!;
  }
  get getConfPassword() {
    return this.createAccForm.get("confPassword")!;
  }

  get getResetPassEmail() {
    return this.resetPassForm.get("email")!;
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

  changePageType(pageType: "signIn" | "createAcc" | "forgotPass") {
    this.pageType = pageType;
  }


  async submitForm() {

    try {
      
      if (this.pageType === "signIn") {
        await this.afAuth.signInWithEmailAndPassword(this.getSignInEmail.value, this.getSignInPassword.value);
        this.snackBar.open("Successfully signed in!", "OK", {
          duration: 5000,
        });
        this.snackService.closeAuthDrawer();
        
      } else if (this.pageType === "createAcc") {
        await this.afAuth.createUserWithEmailAndPassword(this.getCreateAccEmail.value, this.getCreateAccPassword.value);
        this.snackBar.open("Account succesfully created!", "OK", {
          duration: 5000,
        });
        this.snackService.closeAuthDrawer();

      } else {
        await this.afAuth.sendPasswordResetEmail(this.getResetPassEmail.value);
      }

    } catch (error) {
      this.errorText = "Invalid login attempt";
      console.error("There was an unexpected error:", error);
    }

  }
}
