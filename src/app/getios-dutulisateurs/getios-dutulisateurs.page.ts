import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, query, where } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, user } from '../dashboard/auth.service';
@Component({
  selector: 'app-getios-dutulisateurs',
  templateUrl: './getios-dutulisateurs.page.html',
  styleUrls: ['./getios-dutulisateurs.page.scss'],
})
export class GetiosDutulisateursPage implements OnInit {
  curentuser = this.auth.currentUser
  password :number |undefined
  constructor(private firestore:Firestore,private auth:Auth,private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }
  async register(f:{email:any,password:any}){
 
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
    this.authservice.adduser(user)
  }

  ngOnInit() {
    this.getuser().subscribe(res=>{
      console.log(res)
      // this.password = res[0].password
      console.log(res[0].password)
      this.password= res[0].password
    })
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

  getuser(): Observable<user[]> {
    const usermail = this.curentuser?.email;
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", usermail));
    return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
  }
}
