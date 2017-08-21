import { Component } from '@angular/core';
import { Auth } from "../../services/auth.service";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    /**
     *
     */
    constructor(private auth: Auth) {
        
    }
}
