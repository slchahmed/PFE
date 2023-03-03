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
   columns = [{ prop: 'Title' }, { name: 'date_debut' }, { name: 'date_fin' },{ name: 'status' }];
   T:number=0
   G:number=0
   F:number=0
   
   
  constructor(private auth:Auth,private serviceprojects:ProjetService) {
   }

  ngOnInit() {
    console.log(this.user)
  }
  ionViewDidEnter(){
    this.serviceprojects.getprojets().subscribe(projets =>{
    
     
     
     for(let projet of projets){
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

        if (elapsed <= 0) {
          projet.status = 'Not started';
          projet.badgeColor = 'hsl(58,100%,54%)';
          this.T=this.T+1
        } else if (progress >= 1 && projet.status !== 'Completed') {
          projet.status = 'behind schedule';
          projet.badgeColor = '#ff0404';
          this.F=this.F+1
          this.T=this.T+1

        } else if (progress <= 0.6 ) {
          projet.status = 'In progress';
          projet.badgeColor = '#34b74a';
          this.F=this.G+1
          this.T=this.T+1

        } else if(projet.status == 'Completed'){
          projet.status = 'Completed';
          projet.badgeColor = '#55ad48';
          this.G=this.G+1
          this.T=this.T+1

        }
      
     }
   
     this.projets=projets;
   })
 }

 ondelete(projet:projet){
    this.serviceprojects.deleteprojet(projet)
 }
  
 cheked(projet:projet){
   projet.status='Completed'
   this.serviceprojects.updateprojet(projet)
 }
}
