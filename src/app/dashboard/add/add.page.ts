import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { projet, ProjetService } from '../projet.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {
  equipe: string[] = [];
  newEquipeMember!: string;

  constructor(private projetservice:ProjetService,private auth:Auth) { }

  ngOnInit() {
  }

  ajouterProjet(projet:projet){
        delete projet.Equipe;
        projet.chef=this.auth.currentUser?.uid;
        projet.date_debut= new Date(projet.date_debut).getTime();
        projet.date_fin = new Date(projet.date_fin).getTime();
        // const currentDate = new Date().getTime();
        // const daysUntilDeadline = Math.ceil((projet.date_fin - currentDate) / (1000 * 60 * 60 * 24));
        projet.equipe=this.equipe
        this.projetservice.addprojet(projet)
  
  }
 

  addequipeMember() {
    if (this.newEquipeMember && !this.equipe.includes(this.newEquipeMember)) {
      this.equipe.push(this.newEquipeMember);
      console.log(this.newEquipeMember)
      this.newEquipeMember = '';
      console.log(this.equipe)
    }
  }
}


