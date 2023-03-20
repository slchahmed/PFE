import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService, user } from '../dashboard/auth.service';
@Component({
  selector: 'app-getios-dutulisateurs',
  templateUrl: './getios-dutulisateurs.page.html',
  styleUrls: ['./getios-dutulisateurs.page.scss'],
})
export class GetiosDutulisateursPage implements OnInit {
  curentuser = this.auth.currentUser
  password =22083322;
  constructor(private auth:Auth,private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }
  async register(f:{email:any,password:any}){
    console.log(f)
    const loading = await this.loadingController.create();
    await loading.present();
    const user =await this.authservice.register(f)
    await loading.dismiss();

    if(user) {
      await this.authservice.logout();
      await this.login({email:this.curentuser?.email,password:this.password})
   
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
    console.log(user)
    this.authservice.adduser(user)
  }

  ngOnInit() {
  }
  async login(f:{email:any,password:any}){
    const loading = await this.loadingController.create();
    await loading.present();
    const user =await this.authservice.login(f)
    await loading.dismiss();
    
    if(user) {
      this.router.navigateByUrl('/dashboard',{replaceUrl:true})
    }else{
       this.showAlert('login faild ','please try again!')
    }
  }

}
