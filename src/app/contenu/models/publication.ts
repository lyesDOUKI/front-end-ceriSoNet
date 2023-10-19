export class Publication {
  
    _id!: number;
    date!: string;
    hour!: string;
    body!: string;
    createdBy!: number;
    shared!: string;
    images!: images;
    title!: string;
    likes!: number;
    hashtags!: string[];
    comments!: Comment[];
    constructor(obj: any) {
        Object.assign(this, obj);
    }
    showComments : boolean = false;
  }
  
  class Comment {
    commentedBy!: number;
    text!: string;
    date!: string;
    hour!: string;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
  }
  
  class images {
    url!: string;
    title!: string;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
  }