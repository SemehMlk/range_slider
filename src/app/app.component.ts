import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  helloTest: any;

  onRangeChange(event: {min: number, max: number}) {
    console.log("Plage sélectionnée :", event);
  }

  somethingChanged(val: any){
    console.log("velue here: ", this.helloTest)
  }
}
