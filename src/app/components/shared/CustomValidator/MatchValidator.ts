import { AbstractControl, FormGroup } from '@angular/forms';
    
export function MathValidator(passwordControl: string, passwordConfirmacionControl: string){
    return (formGroup: FormGroup) => {
        let password:AbstractControl = formGroup.controls[passwordControl];
        let passwordConfirmacion:AbstractControl = formGroup.controls[passwordConfirmacionControl];

        if (passwordConfirmacion.errors && !passwordConfirmacion.errors.confirmPasswordValidator) {
            return;
        }
        if (password.value !== passwordConfirmacion.value) {
            passwordConfirmacion.setErrors({confirmPasswordValidator: true});
        } else {
            passwordConfirmacion.setErrors(null);
        }
    }
}