import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RouterService } from "./service/router.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{

    constructor(private routerService: RouterService){}
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
            let token = this.routerService.getToken();
            if(token === null){
                this.routerService.routeToLogin();
                return false;
            }
            return true;
    }

}