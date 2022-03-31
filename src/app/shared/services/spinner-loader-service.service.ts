import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinerLoaderComponent } from "../components/spiner-loader/spiner-loader.component";
import { SpinnerLoaderSuperimposedComponent } from "../components/spinner-loader-superimposed/spinner-loader-superimposed.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoaderServiceService {
  private overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay
    ) { }
  
  

  public show() {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerLoaderSuperimposedComponent);
    this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
