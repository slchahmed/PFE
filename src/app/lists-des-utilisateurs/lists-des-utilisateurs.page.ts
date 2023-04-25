import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { user } from '../dashboard/auth.service';
@Component({
  selector: 'app-lists-des-utilisateurs',
  templateUrl: './lists-des-utilisateurs.page.html',
  styleUrls: ['./lists-des-utilisateurs.page.scss'],
})
export class ListsDesUtilisateursPage implements OnInit {
  users!:user[]
  user1!:user;
  p:number =1
  ajouter_un_projet!:boolean 
  modidier_un_projet!:boolean
  suprimer_un_projet!:boolean
  ajouter_un_utilisateur!:boolean
  modifier_un_utilisateur!:boolean
  suprimer_un_utilisateur!:boolean
  termination_des_taches!:boolean
  suprimer_des_taches!:boolean
  search_result!:user[]
  constructor(private firestore:Firestore ,private auth:Auth) { }
  ngOnInit() {
    this.getuser().subscribe(user=>{
      const chef = user
      this.user1 = chef[0]
      
      this.ajouter_un_projet= chef[0].authorisations.ajouter_un_projet
      this.modidier_un_projet=chef[0].authorisations.modidier_un_projet
      this.suprimer_un_projet=chef[0].authorisations.suprimer_un_projet
      this.ajouter_un_utilisateur=chef[0].authorisations.ajouter_un_utilisateur
      this.modifier_un_utilisateur=chef[0].authorisations.modifier_un_utilisateur
      this.suprimer_un_utilisateur=chef[0].authorisations.suprimer_un_utilisateur
      this.termination_des_taches=chef[0].authorisations.termination_des_taches
      this.suprimer_des_taches=chef[0].authorisations.suprimer_des_taches
    })

    
    this.getusers().subscribe(res=>{
      this.users=res
      this.search_result=res
    })
  }
  getusers(): Observable<user[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' })as unknown as Observable<user[]>
  }
  
 ondelete(user:user){
  // this.serviceprojects.deleteprojet(projet)
}



handleChange(value:string){
const query = value.toLowerCase();
this.search_result = this.users.filter(d => d.nom.toLowerCase().indexOf(query) > -1);
}
getuser(): Observable<user[]> {
  const usermail = this.auth.currentUser?.email;
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", "==", usermail));
  return collectionData(q)as unknown as Observable<user[]>
}
}
