export class Publication {
    _id!: number;
    date!: string;
    hour!: string;
    body!: string;
    createdBy!: number;
    images!: images;
    title!: string;
    likes!: number;
    hashtags!: string[];
    comments!: Comment[];
    constructor(obj: any) {
        Object.assign(this, obj);
    }
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