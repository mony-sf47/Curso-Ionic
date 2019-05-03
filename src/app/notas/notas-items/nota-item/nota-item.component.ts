import { Component, OnInit, Input } from '@angular/core';
import { NotaItem } from '../../type';

@Component({
  selector: 'app-nota-item',
  templateUrl: './nota-item.component.html',
  styleUrls: ['./nota-item.component.scss'],
})
export class NotaItemComponent implements OnInit {

  @Input() item: NotaItem;

  constructor() { }

  ngOnInit() {}

}
