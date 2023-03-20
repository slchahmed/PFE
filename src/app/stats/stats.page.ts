import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType ,Chart,Colors} from 'chart.js';
import { projet, ProjetService } from '../dashboard/projet.service';

Chart.register(Colors);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  P:number  =0
  T:number  =0
  G:number  =0
  N:number  =0
  projets!:projet[]
  progress:number=0
 


  
  linecharts ={
    labels:["not start","In progress","completed","behind schedule"],
    datasets:[
      {
        data:[48,44,18,18],

      }
    ]

   }

   


  constructor(private serviceprojects:ProjetService) { }

  ngOnInit() {
     
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
       
          
          if (projet.status == 'Not started') {
            
            this.N = this.N+1
             this.progress = progress
          }
          
           if(projet.status == 'Completed'){
               this.T=this.T+1
             
  
          }
          if (projet.status == 'In progress'){
            this.G = this.G+1
          }
          if (projet.status == 'Behind schedule'){
            this.P = this.P+1
          }
      
  
     }
      console.log(this.N)
      console.log(this.G)
      console.log(this.T)
      console.log(this.P)
     this.projets=projets
    this.rederchartbar(this.N,this.G,this.T,this.P)
    this.rederchartline(this.N,this.G,this.T,this.P)
    this.rederchartzeg(this.N,this.G,this.T,this.P)

    })
   
}

rederchartbar(N:number,G:number,T:number,P:number){
 
  const chart = new Chart('charbar', {
    type: 'line',
    data: {
      labels: ['Not started', 'In progress', 'Completed', 'pass the date'],
      datasets: [{
        label: '# of Votes',
        data: [N, G, T, P],
        fill:true,
        borderWidth: 1,
        backgroundColor: [
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ]

      },{
        label:"jdid",
        data:[14,4,2,4]
      }]
    },
    options: {
   
      aspectRatio: 5,
      plugins:{
        colors: {
          enabled: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
rederchartline(N:number,G:number,T:number,P:number){

  const chart = new Chart('charline', {
    type: 'pie',
    data: {
      labels: ['Not started', 'In progress', 'Completed', 'pass the date'],
      datasets: [{
        label: '# of Votes',
        data: [N, G, T, P],
        borderWidth: 1,

        backgroundColor: [
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ]
      }]
    },
    options: {
      plugins:{
        colors: {
          enabled: true
        }
      },
     
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
rederchartzeg(N:number,G:number,T:number,P:number){

  const chart = new Chart('charzeg', {
    type: 'doughnut',
    data: {
      labels: ['Not started', 'In progress', 'Completed', 'pass the date'],
      datasets: [{
        label: '# of Votes',
        data: [N, G, T, P],
        borderWidth: 1,
        backgroundColor: [
          '#3661EC',
          '#FDA349',
          '#55ad48',
          '#ff0404'
        ]
      }]
    },
    options: {
      plugins:{
        colors: {
          enabled: true
        }
        
      },
     
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
}
