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
  constructor(private auth:Auth,private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController,private firestore:Firestore) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetarchiveById(this.id).subscribe(projet=>{
   
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

getuser(): Observable<user[]> {
  const usermail = this.auth.currentUser?.email;
  const usersRef = collection(this.firestore, 'users');
  const q = query(usersRef, where("email", "==", usermail));
  return collectionData(q, { idField: 'id' })as unknown as Observable<user[]>
}

}