export class User {
    identifiant!: string;
    nom!: string;
    prenom!: string;
    avatar!: string;
    statut_connexion!: number;
    
    constructor(obj:any) {
        Object.assign(this, obj);
    }

    fullName() : string {
        return this.nom + " " + this.prenom;
    }
  }
  