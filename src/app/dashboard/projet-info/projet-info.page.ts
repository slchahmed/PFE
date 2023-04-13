import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { user } from '../auth.service';
import { projet, ProjetService } from '../projet.service';

@Component({
  selector: 'app-projet-info',
  templateUrl: './projet-info.page.html',
  styleUrls: ['./projet-info.page.scss'],
})
export class ProjetInfoPage implements OnInit {

  projet!:projet | null
  id!:string
  chek:boolean=false
  user!:user
  chef!:any
  constructor(private auth:Auth,private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController,private firestore:Firestore) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(projet=>{
   
      if (projet['status'] == 'Not started') {
        projet['badgeColor'] = 'blue';
       
      }
       if ( projet['status'] == 'Behind schedule') {
        
        projet['badgeColor'] = '#ff0404';
     
        

      } 
      if (projet['status'] =='In progress') {
        projet['badgeColor'] = '#FDA349';
    
        

      } 
       if(projet['status'] == 'Completed'){
        projet['badgeColor'] = '#55ad48';         

      }
      this.getuser().subscribe(user=>{
        this.user = user[0] as user
      
        this.chef = this.user.nom
     
        this.projet = projet as projet;
      })
   
      
        
     
    })
  
    
  }




 async showAlert(tache:{title?:string,isdone?:boolean},i:number) {
  const alertId = `alert-${i}`;
 
    const alert = await this.alertcontroller.create({
    id: alertId,
    header:'improtant ! ',
    subHeader: 'Es-tu sûr que ça finira',
    buttons:[{
      text:'ok',
      role:'confirm',
      handler:()=>{
        // this.projet!.taches = this.projet?.taches!.filter(t => t !== tache);
        this.service.updateprojet(this.projet)
      } 
    },
    {
      text:'annuler',
      role:'cancel',
      handler:()=>{
        tache.isdone=false;
      } 
      
    }
  ],
  })
 
  await alert.present();

}

getuser(): Observable<user[]> {
  const usermail = this.auth.currentUser?.email;
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", "==", usermail));
  return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
}

}