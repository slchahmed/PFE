import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { projet, ProjetService } from '../projet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  projet!:projet |null
  equipe: string[] = [];
  newEquipeMember!: string;
  taches: {title?:string,isdone?:boolean}[] = [];
  date_debut!:string
  date_fin!:string
  newtache: {title:string,isdone:boolean} = {title:'',isdone:false};
  title!:string;
  id!:string
  constructor(private alertcontroller:AlertController,private active_router:ActivatedRoute,private service:ProjetService,private auth:Auth,private router:Router) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(res=>{
      this.taches = []
      console.log(res['date_debut'])
      console.log(res['date_fin'])
      this.date_debut=this.formatdate(res['date_debut']).split('.')[0]; 
      this.date_fin=this.formatdate(res['date_fin']).split('.')[0];
    
      this.projet = res as projet;
    
      for(let i of this.projet?.equipe){
        
        if (i && !this.equipe.includes(i)) {
          this.equipe.push(i);
         
          i = '';
          
        }
      }
      for(let i of this.projet.taches!){
       
     
          this.taches.push(i);
          

           
         
      }
    })

    

  }

  update_projet(projet:projet){
        projet.id=this.id
        console.log(projet)
        console.log(projet.id)
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
          console.log(progress)
          if (progress <= 0) {
            projet.status = 'Not started';
            
          } else if (progress >= 1) {
            projet.status = 'Behind schedule';
            
           } 
          else if (progress <= 1 && progress > 0) {
            projet.status = 'In progress';
           
          }
        projet.date_debut=  projet.date_debut.split(',')[0]
         projet.date_fin= projet.date_fin.split(',')[0]
         
    this.service.updateprojet(projet)
    this.router.navigateByUrl('/dashboard')
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
    if (this.title) {
      const newTache = {title: this.title, isdone: false};
      this.taches.push(newTache);
      this.title=''
    }
    console.log(this.taches)
  }
  async showAlert(tache:{title?:string,isdone?:boolean}) {
    
   
      const alert = await this.alertcontroller.create({
      header:'improtant ! ',
      subHeader: 'Es-tu sûr que ça finira',
      buttons:[{
        text:'ok',
        role:'confirm',
        handler:()=>{
          this.projet!.taches = this.projet?.taches!.filter(t => t.title !== tache.title);
          this.service.updateprojet(this.projet)
          this.taches = []
        } 
      },
      {
        text:'annuler',
        role:'cancel',
        handler:()=>{
          
        } 
        
      }
    ],
    })
   
    await alert.present();
  
  }

  formatdate(date:string){
    
    const parts = date.split('/');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[0]) < 10 ? `0${parts[0]}` : parts[0];
    const day = parseInt(parts[1]) < 10 ? `0${parts[1]}` : parts[1];
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    return isoDate
  }

}
