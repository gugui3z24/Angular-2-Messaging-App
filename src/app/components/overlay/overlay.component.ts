import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  public showOverlay: boolean;

  constructor(private _overlayService: OverlayService) { }

  ngOnInit() {
    this._overlayService.showOverlay.subscribe(results => {
      this.showOverlay = results;
    });
  }

}
