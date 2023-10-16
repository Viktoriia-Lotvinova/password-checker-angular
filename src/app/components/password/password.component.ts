import { Component, DoCheck  } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements DoCheck {
  password: string = '';
  previousPassword: string = '';

  firstBlock: string = 'background-color:gray';
  secondBlock: string = 'background-color:gray';
  thirdBlock: string = 'background-color:gray';

  constructor() { }

  ngDoCheck() {
    if (this.password !== this.previousPassword) {
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasDigits = /\d/.test(this.password);
      const hasSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.password);
  
      this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:gray';
  
      if (hasLetters && hasDigits && hasSymbols) {
        this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:green';
      } else if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
        this.firstBlock = this.secondBlock = 'background-color:yellow';
        this.thirdBlock = 'background-color:gray';
      } else if  ((!hasLetters && !hasDigits && !hasSymbols) || (hasLetters && !hasDigits && !hasSymbols) || (!hasLetters && hasDigits && !hasSymbols) || (!hasLetters && !hasDigits && hasSymbols)) {
        this.firstBlock = 'background-color:red';
      }
  
      if (this.password.length < 8 && this.password.length > 0) {
        this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:red';
      }
  
      if (!this.password) {
        this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:gray';
      }
  
      this.previousPassword = this.password;
    }
  }
}
