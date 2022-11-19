import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../model/Book';

@Pipe({
  name: 'searchbook'
})
export class SearchbookPipe implements PipeTransform {

  transform(books: Book[], searchObj: string): any {
    if (searchObj == null){
      return books;
    }
    return books.filter((obj:Book) => {
      return obj.title?.toLowerCase().includes(searchObj.toLowerCase()) ||
       this.filterByAuther(obj.author, searchObj)
    });
  }

  filterByAuther(author:string[], searchObj: string ): boolean {
    let output: any = author?.filter((auth: string)=>{
      return auth.toLowerCase().includes(searchObj.toLowerCase())
     });
     //console.log("Author "+output);
     if(output==null || output.length==0){
      return false;
     }
     return true;
  }

}

