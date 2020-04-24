import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async token => {
        localStorage.setItem('token', token);
        loading.dismiss();
        this.router.navigateByUrl('/create');
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    );
  }

}
