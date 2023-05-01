import { Component, OnInit } from '@angular/core';
import { ProjetService, projet } from '../dashboard/projet.service';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
 p:number = 1
 totalpage :number = 10
 search_result!:projet[]
 projets!:projet[]
  constructor(private auth:Auth,private firestore:Firestore,private alertcontroller:AlertController,private serviceprojects:ProjetService) { }

  ngOnInit() {

    this.getprojets().subscribe(projets =>{
       for(let projet of projets){
         
          const diff = Number(projet.le_temps_a_pris_pour_terminer)
          const wholeDays = Math.floor(diff);
          const remainingHours = (diff - wholeDays) * 24;
          const wholeHours = Math.floor(remainingHours);
          const remainingMinutes = (remainingHours - wholeHours) * 60;
          const wholeMinutes = Math.floor(remainingMinutes);
          const remainingSeconds = (remainingMinutes - wholeMinutes) * 60;
          const wholeSeconds = Math.floor(remainingSeconds);
          projet.le_temps_a_pris_pour_terminer = wholeDays.toString()+' '+'J'+' '+wholeHours.toString()+' '+'H'+' '+wholeMinutes.toString()+' '+'m'
          if (projet.status == 'Not started') {
            
            projet.badgeColor = 'primary';
           
          }
           if ( projet.status == 'Behind schedule') {
            projet.status = 'Behind schedule';
            projet.badgeColor = '#ff0404';
         
            
  
          } 
          if ( projet.status =='In progress') {
           
            projet.badgeColor = '#FDA349';
         
            
  
          } 
           if(projet.status == 'Completed'){
           
             projet.badgeColor = '#3BAE74';
            
             
  
          }
        
         
      
         
       }
       console.log(projets)
       this.projets=projets;
       console.log(this.projets)
       
       this.search_result=this.projets.slice()
       console.log(this.search_result)
     
     })
 
     
   
  }

handleChange(value:any){
  const query = value.toLowerCase();
  this.search_result = this.projets.filter(d => d.Titre.toLowerCase().indexOf(query) > -1);
}
getprojets(): Observable<projet[]> {
  const userId = this.auth.currentUser?.uid;
  const projetsRef = collection(this.firestore, 'projets-archive');
  const q = query(projetsRef, where("chef", "==", userId));
  return collectionData(q, { idField: 'id' })as unknown as Observable<projet[]>
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
        this.serviceprojects.deletearchiveprojet(projet)
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
}
