import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, user } from 'src/app/dashboard/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
 email!:string
 user!:user | null
  constructor(private active:ActivatedRoute,private auth:Auth,private firestore:Firestore,private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.active.paramMap.subscribe(paramap=>{
      this.email= paramap.get('id') as string
     })
     this.getuser().subscribe(user=>{
      const chef = user
      this.user = chef[0]
      // console.log(this.user1)
      // console.log(this.user1.authorisations?.ajouter_un_projet)
      // this.ajouter_un_projet=this.user1.authorisations?.ajouter_un_projet
      // this.modidier_un_projet=this.user1.authorisations?.ajouter_un_projet
      // this.suprimer_un_projet=this.user1.authorisations?.suprimer_un_projet
      // this.ajouter_un_utilisateur=this.user1.authorisations?.ajouter_un_utilisateur
      // this.modifier_un_utilisateur=this.user1.authorisations?.modifier_un_utilisateur
      // this.suprimer_un_utilisateur=this.user1.authorisations?.suprimer_un_utilisateur
      // this.termination_des_taches=this.user1.authorisations?.termination_des_taches
      // this.suprimer_des_taches=this.user1.authorisations?.suprimer_des_taches
    })
  }
  getuser(): Observable<user[]> {
    const usermail = this.email;
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where("email", "==", usermail));
    return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
  }
  updateuser(user:user){

  }
}
