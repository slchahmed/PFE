import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface projet{
  id?:string;
  Titre:string;
  sujet:string;
  chef?:string;
  date_debut:number;
  date_fin:number;
  equipe:string[];
  status?:string;
  Equipe?:string;
  Tache?:string;
  taches?:string[];
}
@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private firestore:Firestore) { }

  getprojets():Observable<projet[]>{
    const projetsref = collection(this.firestore,'projets');
    return collectionData(projetsref, { idField: 'id' }) as unknown as Observable<projet[]>;
  }
  addprojet(projet:projet){
    const projetsref = collection(this.firestore,'projets');
    return addDoc(projetsref,projet);
  }
  deleteprojet(projet:projet){
    const projetsref = doc(this.firestore,`projets/${projet.id}`);
    return deleteDoc(projetsref);
  }

  updateprojet(projet:projet|null){
    const projetref = doc(this.firestore,`projets/${projet?.id}`);
    return updateDoc(projetref,{Titre:projet?.Titre,sujet:projet?.sujet,chef:projet?.chef,dat_debut:projet?.date_debut,date_fin:projet?.date_fin,equipe:projet?.equipe})
  }
  getprojetById(id:string){
    const projetref = doc(this.firestore,`projets/${id}`);
    return docData(projetref,{idField:'id'})
  }
}
