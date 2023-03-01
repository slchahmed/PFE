import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService, user } from '../dashboard/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }
  async register(f:{email:any,password:any}){
    const loading = await this.loadingController.create();
    await loading.present();
    const user =await this.authservice.register(f)
    await loading.dismiss();

    if(user) {
      this.router.navigateByUrl('/dashboard',{replaceUrl:true})
    }else{
       this.showAlert('Registration faild ','please try again!')
    }
    
  }
  async showAlert(header:string,message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons:['ok'],
    })
    await alert.present();
  }

  adduser(user:user){
    this.authservice.adduser(user)
  }

  ngOnInit() {
  }

}
