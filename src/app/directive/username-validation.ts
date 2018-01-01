import {Directive, forwardRef} from '@angular/core';
import {Validator, AbstractControl, NG_ASYNC_VALIDATORS} from '@angular/forms'
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: "[unvalidation][formControlName], [unvalidation][ngModel]",
    providers: [
      {
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(() => UsernameValidation), multi: true
      }
    ]
  })
export class UsernameValidation implements Validator {

    private vaildation: Subject<{[key : string]: any}>;

    validate(ac : AbstractControl) : Promise<{[key: string]: any}>|Observable<{[key :string]: any}> {
        return ac.valueChanges.debounceTime(1000).switchMap(val =>{
            console.log('val', val);
            if(val){
                return Observable.of<{[key : string]: any}>({unmsg: 'Not Avaiable'})
                    .delay(1000)
                    .do(e => {
                        ac.setErrors(e);
                    });
            }
            return Observable.of(null);
        });
        // Observable.of('string').
        // return Observable.of({unmsg: 'Not Avaiable'}).delay(500);
    }
}