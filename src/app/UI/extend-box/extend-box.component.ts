import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extend-box',
  templateUrl: './extend-box.component.html',
  styleUrls: ['./extend-box.component.scss']
})
export class ExtendBoxComponent implements OnInit {
  checkFile = false;
  checkImg = false;
  arrFileShared = [
    {id:1 , pdf : 'Nội dung hội nghị.pdf'},
    {id:2 , pdf : 'Test 2.pdf'},
    {id:3 , pdf : 'Test 3.pdf'},
    {id:4 , pdf : 'test 4.pdf'}
  ]
  arrImgShared = [
    {id:1 , img : '../../../assets/Avatar/2.jpg'},
    {id:2 , img : '../../../assets/Avatar/1.jpg'},
    {id:3 , img : '../../../assets/Avatar/3.jpg'},
    {id:4 , img : '../../../assets/Avatar/4.jpg'},
    {id:5 , img : '../../../assets/Avatar/5.jpg'},
  ]
  constructor() { }
  
  ngOnInit(): void {
  }
  showFile(){
    this.checkFile = !this.checkFile;
  }
  showImg(){
    this.checkImg = !this.checkImg;
  }

}
