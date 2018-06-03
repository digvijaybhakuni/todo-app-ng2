import {Directive, forwardRef} from '@angular/core';
import {Validator, AbstractControl, NG_ASYNC_VALIDATORS} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {UserService} from "../user.service";

@Directive({
  selector: "[unvalidation][formControlName], [unvalidation][ngModel]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UsernameValidation), multi: true
    }, UserService
  ]
})
export class UsernameValidation implements Validator {

  constructor(private userSrv: UserService) {
  }


  validate(ac: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
      const val = ac.value;
      if (val) {
        return this.userSrv.checkUsername(val).map(res => {
          console.log('exists[res]', res);
          if (res['exists']) {
            return {unmsg: 'Username is not available'};
          }
          return null;
        }).do(r => ac.setErrors(r));
      }
      return Observable.of(null);
    }
}
