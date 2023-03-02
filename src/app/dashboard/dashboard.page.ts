import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { projet, ProjetService } from './projet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
   user = this.auth.currentUser;
   projets!:projet[];
   
  constructor(private auth:Auth,private serviceprojects:ProjetService) {
   }

  ngOnInit() {
    console.log(this.user)
  }
  ionViewDidEnter(){
    this.serviceprojects.getprojets().subscribe(projets =>{
    
     this.projets=projets;
     
     for(let projet of this.projets){
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

        if (elapsed <= 0) {
          projet.status = 'Not started';
          projet.badgeColor = 'gray';
        } else if (progress >= 0.6) {
          projet.status = 'Completed';
          projet.badgeColor = 'green';
        } else if (progress >= 0.4) {
          projet.status = 'In progress';
          projet.badgeColor = 'yellow';
        } else {
          projet.status = 'Behind schedule';
          projet.badgeColor = 'yellow';
        }
        console.log(projet.badgeColor)
     }
   })
 }
  
}
