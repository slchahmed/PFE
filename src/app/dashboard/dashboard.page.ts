import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, doc, Firestore, query, where,updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, user } from './auth.service';
import { projet, ProjetService } from './projet.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   user = this.auth.currentUser;
   user1!:user | undefined;
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
   N!:number   
   passe_delai:number = 0
   date_fin!:string
   date_fins!:string[]
   date_fins_temp:string[] = []
  constructor(private auth:Auth,private serviceprojects:ProjetService,private router:Router,private firestore:Firestore, private alertcontroller:AlertController) {
   }

  ngOnInit() {
    this.getuser().subscribe(user=>{
      const chef = user
      this.user1 = chef[0]
      // console.log(this.user1)
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
    
    
    // console.log(this.auth.currentUser)
    this.serviceprojects.getprojets().subscribe(projets =>{
    
     this.T=0
     this.G=0
     this.F=0
     this.P=0
     this.N=0
     this.passe_delai = 0
      for(let projet of projets){
        
      
        console.log(projet.date_fin)

         this.T=this.T+1
         projet.date_debut= new Date(projet.date_debut).getTime();
         projet.date_fin = new Date(projet.date_fin).getTime();
        console.log(projet.date_fin)

         const currentDate = new Date();
         const totalTime = projet.date_fin - projet.date_debut;
         const elapsed = currentDate.getTime() - projet.date_debut;
 
         const date_d = new Date(projet.date_debut);
         const dateString_d = date_d.toLocaleString()
         projet.date_debut = dateString_d
 
         const date_f = new Date(projet.date_fin);
         const dateString_f = date_f.toLocaleString()
         projet.date_fin = dateString_f
         console.log(projet.date_fin)
 
         const progress = elapsed / totalTime;
 
       
         if ( progress<0 && projet.status == 'Not started') {
           this.N = this.N+1
           projet.badgeColor = 'primary';
          
         }
          if (progress >= 1 && projet.status !== 'Completed') {
           projet.status = 'Behind schedule';
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
            projet.badgeColor = '#3BAE74';
            this.F=this.F+1
            
 
         }
          if(projet.status !== 'Completed' && progress > 0.8 ){
           
            
            this.date_fin=this.formatdate(projet.date_fin).split('T')[0];
            this.date_fins_temp.push(this.date_fin)
            console.log(projet.date_fin)
            
 
         }
         if (projet.status == 'Behind schedule'){
          this.passe_delai=this.passe_delai + 1
          
         }
         projet.date_debut = projet.date_debut.split(',')[0]; 
         projet.date_fin = projet.date_fin.split(',')[0]; 
         console.log(projet.date_fin)
     
        
      }
      this.date_fins = this.date_fins_temp
      // console.log(this.date_fins)
      this.projets=projets;
    
      this.search_result=this.projets.slice()
    
    })

    
  
  }
  ionViewDidleave(){
    this.T=0
   
 }


 async ondelete(projet:projet){
    

    const alert = await this.alertcontroller.create({
      id: '1',
      header:'improtant ! ',
      subHeader: 'ce projet sera supprimé',
      buttons:[{
        text:'ok',
        role:'confirm',
        handler:()=>{
          this.serviceprojects.deleteprojet(projet)
        } 
      },
      {
        text:'annuler',
        role:'cancel',
      }
    ],
    })
   
    await alert.present();
  
 }
 async archive(projet:projet){
  const alert = await this.alertcontroller.create({
    id: '1',
    header:'improtant ! ',
    subHeader: "ce projet sera définitivement supprimé de la liste ici mais vous pouvez toujours le trouver dans la liste des archives, êtes-vous d'accord avec ça",
    buttons:[{
      text:'ok',
      role:'confirm',
      handler:()=>{
        this.addtoarchive(projet)
        this.serviceprojects.deleteprojet(projet)
      } 
    },
    {
      text:'annuler',
      role:'cancel',
    }
  ],
  })
 
  await alert.present();
  
 }
  
 async cheked(projet:projet){
  for(let tache of projet.taches!){
      if(!tache.isdone){
        const alert = await this.alertcontroller.create({
          id: '1',
          header:'improtant ! ',
          subHeader: 'certaines des tâches de ce projet ne sont pas encore terminées êtes-vous sûr de vouloir marquer comme terminé',
          buttons:[{
            text:'ok',
            role:'confirm',
            handler:()=>{
              projet.status='Completed'
              this.serviceprojects.updateprojet(projet)
              
            } 
          },
          {
            text:'annuler',
            role:'cancel',
          }
        ],
        })
       
        await alert.present();
      }else{
        projet.status='Completed'
        this.serviceprojects.updateprojet(projet)
        this.addtoarchive(projet)
      }
  }
 }
 addtoarchive(projet:projet){
    const current = new Date().getTime()
    const d_d = new Date(projet.date_debut).getTime()
    const diff = (current - d_d) / (24 * 60 * 60 * 1000) 
    projet.le_temps_a_pris_pour_terminer = diff.toString() 
    projet.status='Completed'
    this.serviceprojects.addtoarchive(projet)
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
formatdate(date:string){
    
  const parts = date.split('/');
  const year = parseInt(parts[2]);
  const month = parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0];
  const day = parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1];
  const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
  return isoDate
}

updateuser(user:user){
  user.ide = this.auth.currentUser?.uid
  const userref = doc(this.firestore,`users/${user?.id}`);
  return updateDoc(userref,{ide:user?.ide,nom:user?.nom,phone_number:user?.phone_number,authorisations:{ajouter_un_projet:user?.authorisations.ajouter_un_projet,modidier_un_projet:user?.authorisations.modidier_un_projet, suprimer_un_projet:user?.authorisations.suprimer_un_projet, ajouter_un_utilisateur:user?.authorisations.ajouter_un_utilisateur, modifier_un_utilisateur:user?.authorisations.modifier_un_utilisateur, suprimer_un_utilisateur:user?.authorisations.suprimer_un_utilisateur, termination_des_taches:user?.authorisations.termination_des_taches, suprimer_des_taches:user?.authorisations.suprimer_des_taches}})
}

}
