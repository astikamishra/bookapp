import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchauth'
})
export class SearchauthPipe implements PipeTransform {

  transform(authors: string[], searchObj: string): any {
    if (searchObj == null){
      return authors;
    }
    return authors.filter((obj:string) => {
      return obj?.toLowerCase().includes(searchObj.toLowerCase())
    });
  }

}
