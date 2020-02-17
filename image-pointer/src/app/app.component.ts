import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RequestService } from './requestService'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private reqService: RequestService) {

  }
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  savedImage = ''
  title = 'image-pointer';
  imageBasePath = '../assets/serverImages/'
  imgUrl = ''
  imageCollection = ['hand.jpeg', 'jaw.jpeg', 'knee.jpeg']
  imageObj = null;
  rect = {
    w: 0,
    h: 0,
    startX: 0,
    startY: 0
  };
  drag = false

  getImg(image: string) {
    return `${this.imageBasePath}${image}`;
  }

  onImgSelect = (e) => {
    this.context.clearRect(0, 0, 500, 500);
    this.imageObj = new Image();
    this.imageObj.onload = () => {
      this.context.drawImage(this.imageObj, 0, 0);
    };
    this.imageObj.src = e.target.src;
  }


  ngAfterViewInit() {
    var self = this;

    self.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    self.imageObj = new Image();
    self.imageObj.onload = () => {
      self.context.drawImage(self.imageObj, 0, 0);
    };
    self.imageObj.src = '../assets/serverImages/hand.jpeg';
    self.canvasEl.nativeElement.addEventListener('mousedown', self.mouseDown, false);
    self.canvasEl.nativeElement.addEventListener('mouseup', self.mouseUp, false);
    self.canvasEl.nativeElement.addEventListener('mousemove', self.mouseMove, false);

  }
  draw = () => {
    this.context.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
  }

  mouseDown = (e) => {
    this.rect.startX = e.pageX - e.target.offsetLeft;
    this.rect.startY = e.pageY - e.target.offsetTop;
    this.drag = true;
  }

  mouseUp = () => {
    this.drag = false;
  }

  mouseMove = (e) => {
    if (this.drag) {
      this.context.clearRect(0, 0, 500, 500);
      this.context.drawImage(this.imageObj, 0, 0);
      this.rect.w = (e.pageX - e.target.offsetLeft) - this.rect.startX;
      this.rect.h = (e.pageY - e.target.offsetTop) - this.rect.startY;
      this.context.strokeStyle = 'red';
      this.context.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
      this.draw();
    }
  }

  upload = (e) => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.savedImage = canvas.toDataURL();
//let base64Image = this.savedImage.split(';base64,').pop();

    this.reqService.saveImage(this.savedImage); ``
  }

}
