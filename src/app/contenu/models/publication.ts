export class Publication {
  
    _id!: number;
    date!: string;
    hour!: string;
    body!: string;
    createdBy!: number;
    shared!: number;
    images!: images;
    title!: string;
    likes!: number;
    hashtags!: string[];
    comments!: Comment[];
    constructor(obj: any) {
        Object.assign(this, obj);
    }
    showComments : boolean = false;
    identifiantAuteur !: string;
    nomAuteur !: string;
    prenomAuteur !: string;
    avatarAuteur !: string;
  }
  
  class Comment {
    commentedBy!: number;
    text!: string;
    date!: string;
    hour!: string;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
    identifiantAuteur !: string;
    nomAuteur !: string;
    prenomAuteur !: string;
    avatarAuteur !: string;
  }
  
  class images {
    url!: string;
    title!: string;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
  }