import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { projet, ProjetService } from '../projet.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {
  equipe: string[] = [];
  newEquipeMember!: string;
  taches: string[] = [];
  newtache!: string;
  T!:number;
  F!:number;
  G!:number;

  constructor(private projetservice:ProjetService,private auth:Auth,private router:Router) { }

  ngOnInit() {
  }

  ajouterProjet(projet:projet){
        delete projet.Equipe;
        delete projet.Tache;
        projet.chef=this.auth.currentUser?.uid;
        projet.date_debut= new Date(projet.date_debut).getTime();
        projet.date_fin = new Date(projet.date_fin).getTime();
        // const currentDate = new Date().getTime();
        // const daysUntilDeadline = Math.ceil((projet.date_fin - currentDate) / (1000 * 60 * 60 * 24));
        projet.equipe=this.equipe
        projet.taches=this.taches







        
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
            
          } else if (progress >= 1) {
            projet.status = 'Behind schedule';
            
           } 
          else if (progress <= 0.6) {
            projet.status = 'In progress';
           
          } 
        
       








        this.projetservice.addprojet(projet)
        // this.router.navigateByUrl('/dashboard')

  
  }
 

  addequipeMember() {
    if (this.newEquipeMember && !this.equipe.includes(this.newEquipeMember)) {
      this.equipe.push(this.newEquipeMember);
      console.log(this.newEquipeMember)
      this.newEquipeMember = '';
      console.log(this.equipe)
    }
  }
  addtache() {
    if (this.newtache && !this.taches.includes(this.newtache)) {
     
      this.taches.push(this.newtache);
      console.log(this.newtache)
      this.newtache=''
      console.log(this.equipe)
    }
  }
}


