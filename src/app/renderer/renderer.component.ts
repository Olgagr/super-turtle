import { Component, OnInit } from '@angular/core';
import { InstructionsStoreService } from '../instructions-store.service';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit {

  constructor(public instructionsStoreService: InstructionsStoreService) { }

  ngOnInit(): void {
  }

}
