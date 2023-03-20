import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, docData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
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
 id!:string
 user!:user | null
  constructor(private active:ActivatedRoute,private auth:Auth,private firestore:Firestore,private loadingController: LoadingController,private alertController:AlertController,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.active.paramMap.subscribe(paramap=>{
      this.id= paramap.get('id') as string
     })
    //  this.getuser().subscribe(user=>{
    //   const chef = user
    //   this.user = chef[0]
    //   console.log(this.user1)
    //   console.log(this.user1.authorisations?.ajouter_un_projet)
    //   this.ajouter_un_projet=this.user1.authorisations?.ajouter_un_projet
    //   this.modidier_un_projet=this.user1.authorisations?.ajouter_un_projet
    //   this.suprimer_un_projet=this.user1.authorisations?.suprimer_un_projet
    //   this.ajouter_un_utilisateur=this.user1.authorisations?.ajouter_un_utilisateur
    //   this.modifier_un_utilisateur=this.user1.authorisations?.modifier_un_utilisateur
    //   this.suprimer_un_utilisateur=this.user1.authorisations?.suprimer_un_utilisateur
    //   this.termination_des_taches=this.user1.authorisations?.termination_des_taches
    //   this.suprimer_des_taches=this.user1.authorisations?.suprimer_des_taches
    // })
    this.getprojetById().subscribe(res=>{
      this.user = res as user
      console.log(this.user.id)
    })
  }

  getprojetById(){
    const userref = doc(this.firestore,`users/${this.id}`);
    return docData(userref,{idField:'id'})
  }
 
  updateuser(user:user|null){
    const userref = doc(this.firestore,`users/${this.user?.id}`);
    return updateDoc(userref,{nom:user?.nom,phone_number:user?.phone_number,authorisations:{ajouter_un_projet:user?.authorisations.ajouter_un_projet,modidier_un_projet:user?.authorisations.modidier_un_projet, suprimer_un_projet:user?.authorisations.suprimer_un_projet, ajouter_un_utilisateur:user?.authorisations.ajouter_un_utilisateur, modifier_un_utilisateur:user?.authorisations.modifier_un_utilisateur, suprimer_un_utilisateur:user?.authorisations.suprimer_un_utilisateur, termination_des_taches:user?.authorisations.termination_des_taches, suprimer_des_taches:user?.authorisations.suprimer_des_taches}})
  }

  update(user:user){
    this.updateuser(user)
    this.router.navigateByUrl('/lists-des-utilisateurs')

  }
}
