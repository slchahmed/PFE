import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface projet{
  id?:string;
  Titre:string;
  sujet:string;
  chef?:string;
  date_debut:any;
  date_fin:any;
  equipe:string[];
  status?:string;
  badgeColor?:string;
  Equipe?:string;
  Tache?:string;
  tache:{title?:string,isdone?:boolean};
  taches?:{isdone?:boolean,title?:string}[];
}
@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private firestore:Firestore , private auth:Auth) { }

  getprojets(): Observable<projet[]> {
    const userId = this.auth.currentUser?.uid;
    const projetsRef = collection(this.firestore, 'projets');
    const q = query(projetsRef, where("chef", "==", userId));
    return collectionData(q, { idField: 'id' })as unknown as Observable<projet[]>
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
    return updateDoc(projetref,{Titre:projet?.Titre,sujet:projet?.sujet,chef:projet?.chef,date_debut:projet?.date_debut,date_fin:projet?.date_fin,equipe:projet?.equipe,status:projet?.status,taches:projet?.taches})
  }
  getprojetById(id:string){
    const projetref = doc(this.firestore,`projets/${id}`);
    return docData(projetref,{idField:'id'})
  }
}
