export class User {
    id!: number;
    identifiant!: string;
    nom!: string;
    prenom!: string;
    avatar!: string;
    statut_connexion!: number;
    date_co !: string;
    constructor(obj:any) {
        Object.assign(this, obj);
    }

    fullName() : string {
        return this.nom + " " + this.prenom;
    }
   /* dateConnection() : string {
        const annee = this.date_connection.getFullYear();
        const mois = this.date_connection.getMonth() + 1;
        const jour = this.date_connection.getDate();
        return jour + "/" + mois + "/" + annee;
    }
    heurConnection() : string {
        
        const heure = this.date_connection.getHours();
        const minute = this.date_connection.getMinutes();
        const seconde = this.date_connection.getSeconds();
        return heure + ":" + minute + ":" + seconde;

     }*/
  }
  