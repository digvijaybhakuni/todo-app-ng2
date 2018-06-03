import {Directive, Input, forwardRef} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms'
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HostBinding} from '@angular/core/src/metadata/directives';

@Directive({
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualValueValidation), multi: true
    }
  ],
  selector: '[equalTo][formControlName], [equalTo][ngModel]'
})
export class EqualValueValidation implements Validator {

  @Input('equalTo')
  private equalTo: AbstractControl;

  @HostBinding('attr.data-refval')
  @Input('attr.data-refval')
  private refVal: any;

  validate(ac: AbstractControl): { [key: string]: any } {
    const value = ac.value;
    if (this.equalTo) {
      const val = this.equalTo.value;
      console.log('val', val);
    }
    console.log('refVal', this.refVal);
    let toValue = !this.refVal ? undefined : this.refVal;
    if (this.equalTo) {
      toValue = this.equalTo.value;
    }
    console.log('LOG s', value);
    console.log('LOG r', toValue);
    if (value !== toValue) {
      return {notequal: true}
    }
    return null;
  }
}
