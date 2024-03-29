import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { user } from '../../dashboard/auth.service';
import { projet, ProjetService } from '../../dashboard/projet.service';

@Component({
  selector: 'app-info-projet',
  templateUrl: './info-projet.page.html',
  styleUrls: ['./info-projet.page.scss'],
})
export class InfoProjetPage implements OnInit {
  projet!:projet | null
  id!:string
  chek:boolean=false
  user!:user
  chef!:any
  subbadgeColor!:string
  constructor(private auth:Auth,private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController,private firestore:Firestore) { }
  status!:string
  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetarchiveById(this.id).subscribe(projet=>{
   
      if (projet['status'] == 'Not started') {
        projet['badgeColor'] = 'blue';
        this.status = 'pas commencé'
      }
       if ( projet['status'] == 'Behind schedule') {
        
        projet['badgeColor'] = '#ff0404';
        this.subbadgeColor = '#FFC1C9'
        this.status = 'en retard'

      } 
      if (projet['status'] =='In progress') {
        projet['badgeColor'] = '#FDA349';
        this.subbadgeColor = '#ffe0c0'
        this.status = 'en cours'
    
        

      } 
       if(projet['status'] == 'Completed'){
        projet['badgeColor'] = '#3BAE74';         
        this.subbadgeColor = '#d5f3db'
        this.status = 'Complété'

        
      }
      this.getuser().subscribe(user=>{
        this.user = user[0] as user
      
        this.chef = this.user.nom
     
        this.projet = projet as projet;
      })
   
      
        
     
    })
  
    
  }

getuser(): Observable<user[]> {
  const usermail = this.auth.currentUser?.email;
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", "==", usermail));
  return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
}

}