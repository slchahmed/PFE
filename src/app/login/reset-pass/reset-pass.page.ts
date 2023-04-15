import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService, user } from 'src/app/dashboard/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {
user!:user
  constructor(private authservice:AuthService,private firestore:Firestore) { }

  ngOnInit() {
  }
  passwordreset(email:string,password:number){
  console.log(password)
  const subscribtion = this.getuser(email).subscribe(user => {
     const chef = user;
     this.user = chef[0];

     console.log(this.user);

     Promise.all([this.updateuser(this.user, password)])
     .then(() => console.log('user updated'));
     subscribtion.unsubscribe()
 });
       
   this.authservice.resetPassword(email)

  }
  getuser(email:string): Observable<user[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", email));
    return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
  }
  updateuser(user:user ,password:number){
    user.password = password
    const userref = doc(this.firestore,`users/${user?.id}`);
    return updateDoc(userref,{nom:user?.nom,password:user?.password,phone_number:user?.phone_number,authorisations:{ajouter_un_projet:user?.authorisations.ajouter_un_projet,modidier_un_projet:user?.authorisations.modidier_un_projet, suprimer_un_projet:user?.authorisations.suprimer_un_projet, ajouter_un_utilisateur:user?.authorisations.ajouter_un_utilisateur, modifier_un_utilisateur:user?.authorisations.modifier_un_utilisateur, suprimer_un_utilisateur:user?.authorisations.suprimer_un_utilisateur, termination_des_taches:user?.authorisations.termination_des_taches, suprimer_des_taches:user?.authorisations.suprimer_des_taches}})
  }
}
