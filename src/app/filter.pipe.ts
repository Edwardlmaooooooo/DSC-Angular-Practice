import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], cond): unknown {
    console.log(value, cond);
    if(cond=="all"){
      return value
    }
    if(cond=="active"){
      return value.filter(x=> !x.isCompleted)
    }
    if(cond=="completed"){
      return value.filter(x=> x.isCompleted)
    }
    return value;
  }

}
