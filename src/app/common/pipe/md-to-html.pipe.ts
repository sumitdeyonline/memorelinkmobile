import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlCommonPipe implements PipeTransform {


  //constructor(private contentful: ContentfulService){}

  transform(value: string): string {
    //console.log("MarkDown HTML ... &&&&& ..0");
    //return this.contentful.markdownToHtml(value);
    return this.markdownToHtml(value);
  }

  markdownToHtml(md: string) {
    //console.log("MarkDown HTML ... &&&&& ");
    return marked(md)
    //return md+"Test ....";
  }

}
