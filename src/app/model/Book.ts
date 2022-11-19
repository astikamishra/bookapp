export class Book {
    id?: number;
    title?: string;
    author?: string[];
    publishyear?: string;
    key?: string;
    availability?: any;
    edition?: number;

    constructor() {
      this.title = '';
      this.author = [];
      this.publishyear = '';
      this.key = '';
      this.availability = '';
    }
}