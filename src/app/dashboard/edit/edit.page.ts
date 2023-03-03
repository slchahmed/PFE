import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projet, ProjetService } from '../projet.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  projet!:projet |null
  id!:string
  constructor(private active_router:ActivatedRoute,private service:ProjetService) { }

  ngOnInit() {
    this.active_router.paramMap.subscribe(paramap=>{
     this.id= paramap.get('id') as string
    })
    this.service.getprojetById(this.id).subscribe(res=>{
      this.projet = res as projet;
    })

  }

}
