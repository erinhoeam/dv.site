import { Component, OnInit, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationError, NavigationEnd, Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-main-principal',
  templateUrl: './main-principal.component.html',
  styleUrls: ['./main-principal.component.scss']
})
export class MainPrincipalComponent implements OnInit {
  @ViewChild("spinnerElement") spinnerElement: ElementRef
  
  constructor(private router: Router,
              private ngZone: NgZone,
              private renderer: Renderer) { 
      this.router.events.subscribe((event:RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: RouterEvent){
    if(event instanceof NavigationStart){
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setElementStyle(this.spinnerElement.nativeElement,'display','block');
      });
    }
    if (event instanceof NavigationEnd) {
      this.hideSpinner()
    }
    if (event instanceof NavigationCancel) {
      this.hideSpinner()
    }
    if (event instanceof NavigationError) {
      this.hideSpinner()
    }
  }

  private hideSpinner(): void {
    // We wanna run this function outside of Angular's zone to
    // bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      // For simplicity we are going to turn opacity on / off
      // you could add/remove a class for more advanced styling
      // and enter/leave animation of the spinner
      this.renderer.setElementStyle(
        this.spinnerElement.nativeElement,
        'display',
        'none'
      )
    })
  }

  ngOnInit() {
    if (this.router.url === '/') {
            this.router.navigate(['/home/inicial']);
    }
  }

}
