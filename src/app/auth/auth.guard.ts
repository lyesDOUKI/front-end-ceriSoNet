import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  console.log('dans le guard');
  const router = inject(Router);
  const user = localStorage.getItem('objetUser');
  if(user){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};

export const authGuardLogin: CanActivateFn = (route, state) => {
  console.log('dans le guard');
  const router = inject(Router);
  const user = localStorage.getItem('objetUser');
  if(user){
    router.navigate(['']);
    return false;
  }else{
    return true;
  }
}