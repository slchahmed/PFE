import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  constructor(private active_router:ActivatedRoute,private service:ProjetService,private alertcontroller:AlertController) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(res=>{
      this.projet = res as projet;
    })
    
  }




 async showAlert(tache:string) {
  const alert = await this.alertcontroller.create({
    header:'improtant ! ',
    subHeader: 'Es-tu sûr que ça finira',
    buttons:[{
      text:'ok',
      role:'confirm',
      handler:()=>{
        console.log(tache)
        this.projet!.taches = this.projet?.taches!.filter(t => t !== tache);
        this.service.updateprojet(this.projet)
      } 
    },
    {
      text:'annuler',
      role:'cancel'
    }
  ],
  })
  await alert.present();
}

}
