import {
  Component,
  DoCheck
} from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})

export class PasswordComponent implements DoCheck {
  password: string = '';
  previousPassword: string = '';
  isPasswordHidden: string = 'password';

  firstBlock: string = 'background-color:gray';
  secondBlock: string = 'background-color:gray';
  thirdBlock: string = 'background-color:gray';

  constructor() {}

  ngDoCheck() {
    if (this.password !== this.previousPassword) {

      this.setBgGray();

      this.setStyle(this.setPasswordLevel(this.password));

      if (this.password.length < 8 && this.password.length > 0) {
        this.setBgRed();
      }

      if (!this.password) {
        this.setBgGray();
      }

      this.previousPassword = this.password;
    }
  }

  setPasswordLevel(password: string): string {

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      return 'strong'
    } else if ((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols)) {
      return 'medium'
    } else if ((hasLetters && !hasDigits && !hasSymbols) || (!hasLetters && hasDigits && !hasSymbols) || (!hasLetters && !hasDigits && hasSymbols)) {
      return 'easy'
    } else {
      return '';
    }

  }

  setBgGray() {
    this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:gray';
  }

  setBgRed(){
    this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:red';
  }

  setStyle(level: string) {
    if (level == 'easy') {
      this.firstBlock = 'background-color:red';
    } else if (level == 'medium') {
      this.firstBlock = this.secondBlock = 'background-color:yellow';
      this.thirdBlock = 'background-color:gray';
    } else {
      this.firstBlock = this.secondBlock = this.thirdBlock = 'background-color:green';
    }
  }

  togglePassword() {
    this.isPasswordHidden == 'password' ? this.isPasswordHidden = 'text' : this.isPasswordHidden = 'password';
  }


}
