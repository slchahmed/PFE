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


