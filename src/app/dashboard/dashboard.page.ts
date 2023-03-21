import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, user } from './auth.service';
import { projet, ProjetService } from './projet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   user = this.auth.currentUser;
   user1!:user;
   ajouter_un_projet!:boolean  | undefined
   modidier_un_projet!:boolean | undefined
   suprimer_un_projet!:boolean | undefined
   ajouter_un_utilisateur!:boolean | undefined
   modifier_un_utilisateur!:boolean | undefined
   suprimer_un_utilisateur!:boolean | undefined
   termination_des_taches!:boolean | undefined
   suprimer_des_taches!:boolean | undefined
   gestion_des_utilisateur!:boolean |undefined
   p:number = 1
   totalpage :number = 10
   projets!:projet[];
   search_result!:projet[];
   columns = [{ prop: 'Title' }, { name: 'date_debut' }, { name: 'date_fin' },{ name: 'status' }];
   T!:number
   G!:number
   F!:number   
   P!:number   
   passe_delai:number = 0
  constructor(private auth:Auth,private serviceprojects:ProjetService,private router:Router,private firestore:Firestore) {
   }

  ngOnInit() {
    this.getuser().subscribe(user=>{
      const chef = user
      this.user1 = chef[0]
   
      this.ajouter_un_projet=this.user1.authorisations?.ajouter_un_projet
      this.modidier_un_projet=this.user1.authorisations?.modidier_un_projet
      this.suprimer_un_projet=this.user1.authorisations?.suprimer_un_projet
      this.ajouter_un_utilisateur=this.user1.authorisations?.ajouter_un_utilisateur
      this.modifier_un_utilisateur=this.user1.authorisations?.modifier_un_utilisateur
      this.suprimer_un_utilisateur=this.user1.authorisations?.suprimer_un_utilisateur
      this.termination_des_taches=this.user1.authorisations?.termination_des_taches
      this.suprimer_des_taches=this.user1.authorisations?.suprimer_des_taches
      this.gestion_des_utilisateur=this.user1.authorisations.gestion_des_utilisateur

    })
    
    this.serviceprojects.getprojets().subscribe(projets =>{
    
     this.T=0
     this.G=0
     this.F=0
     this.P=0
     
      for(let projet of projets){
        
         
         this.T=this.T+1
         projet.date_debut= new Date(projet.date_debut).getTime();
         projet.date_fin = new Date(projet.date_fin).getTime();
         const currentDate = new Date();
         const totalTime = projet.date_fin - projet.date_debut;
         const elapsed = currentDate.getTime() - projet.date_debut;
 
         const date_d = new Date(projet.date_debut);
         const dateString_d = date_d.toLocaleString()
         projet.date_debut = dateString_d
 
         const date_f = new Date(projet.date_fin);
         const dateString_f = date_f.toLocaleString()
         projet.date_fin = dateString_f
 
         const progress = elapsed / totalTime;
 
       
         if ( progress<0 && projet.status == 'Not started') {
           
           projet.badgeColor = 'primary';
          
         }
          if (progress >= 1 && projet.status !== 'Completed') {
           projet.status = 'behind schedule';
           projet.badgeColor = '#ff0404';
           this.P=this.P+1
        
           
 
         } 
         if (progress <= 1 && progress > 0 && projet.status !=='Completed') {
           projet.status = 'In progress';
           projet.badgeColor = '#FDA349';
           this.G=this.G+1
           
 
         } 
          if(projet.status == 'Completed'){
            projet.status = 'Completed';
            projet.badgeColor = '#55ad48';
            this.F=this.F+1
            
 
         }
         if (projet.status == 'behind schedule'){
          this.passe_delai=this.passe_delai + 1
         }
     
        projet.date_debut = projet.date_debut.split(',')[0]; 
        projet.date_fin = projet.date_fin.split(',')[0]; 
     
         
      }
     
      
      this.projets=projets;
      this.search_result=this.projets.slice()
    
    })
  }
  ionViewDidleave(){
    this.T=0
   
 }


 ondelete(projet:projet){
    this.serviceprojects.deleteprojet(projet)
 }
  
 cheked(projet:projet){
   projet.status='Completed'
   this.serviceprojects.updateprojet(projet)
 }

 handleChange(value:string){
  const query = value.toLowerCase();
  this.search_result = this.projets.filter(d => d.Titre.toLowerCase().indexOf(query) > -1);
 }
 list_proj(datetime:string |string[] |null | undefined){
    
    
    this.router.navigate(['dashboard','list-date',datetime as string])
 }
 getuser(): Observable<user[]> {
  const usermail = this.auth.currentUser?.email;
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", "==", usermail));
  return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
}

}
