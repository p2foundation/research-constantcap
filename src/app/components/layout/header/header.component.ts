import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'src/app/Services/auth/auth.service';
import * as crypto from 'crypto';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class HeaderComponent implements OnInit {

    location: any;
    navClass: any;
    logo: any;
    navContainer: any;

    // navClass = 'nav-area';
    // navContainer = 'container-fluid';
    // logo = 'assets/img/logo.png';
    isLoggedIn: boolean;
    gravatarUrl: string;

    constructor(
        public router: Router,
        location: Location,
        private authService: AuthService
    ) {
        const userEmail = 'user@example.com'; // Replace with the user's email address
        const gravatarDefault = 'https://example.com/default-avatar.jpg'; // Replace with your default avatar URL
        this.gravatarUrl = `https://www.gravatar.com/avatar/${this.getMD5(userEmail)}?s=80&d=${gravatarDefault}`;
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.location = this.router.url;
                    if (this.location == '/') {
                        this.navClass = 'navbar-area navbar-area-with-position-relative';
                        this.navContainer = 'container-fluid';
                        this.logo = 'assets/img/black-logo.png';
                    } else if (this.location == '/machine-learning') {
                        this.navClass = 'navbar-area navbar-style-three';
                        this.navContainer = 'container';
                        this.logo = 'assets/img/black-logo.png';
                    } else if (this.location == '/machine-learning-2') {
                        this.navClass = 'navbar-area navbar-style-four';
                        this.navContainer = 'container-fluid';
                        this.logo = 'assets/img/black-logo.png';
                    } else if (this.location == '/home-5') {
                        this.navClass = 'navbar-area navbar-style-three';
                        this.navContainer = 'container';
                        this.logo = 'assets/img/black-logo.png';
                    } else if (this.location == '/home-6' || this.location == '/home-7') {
                        this.navClass = 'navbar-area navbar-area-with-position-relative';
                        this.navContainer = 'container-fluid';
                        this.logo = 'assets/img/black-logo.png';
                    } else if (this.location == '/home-8') {
                        this.navClass = 'navbar-area navbar-style-three navbar-area-with-position-relative';
                        this.navContainer = 'container-fluid';
                        this.logo = 'assets/img/black-logo.png';
                    } else {
                        this.navClass = 'navbar-area navbar-style-two';
                        this.navContainer = 'container';
                        this.logo = 'assets/img/white-logo.png';
                    }
                }
            });
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.checkLoggedIn();
        console.log(`isLoggedIn response ==>`, this.isLoggedIn)
    }


    getMD5(email: string): string {
        if (typeof email !== 'string') {
            throw new Error('Email must be a string');
        }

        if (!email.trim()) {
            throw new Error('Email cannot be empty');
        }

        try {
            const md5 = crypto.createHash('md5');
            md5.update(email.toLowerCase().trim());
            return md5.digest('hex');
        } catch (error) {
            throw new Error(`Failed to generate MD5 hash: ${error.message}`);
        }
    }

    logout(): void {
        this.authService.logout();
    }

    ngAfterViewInit() {
        this.authService.isLoggedIn$.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });
    }

}
