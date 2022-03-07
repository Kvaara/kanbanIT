import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-source-code',
  templateUrl: './tools-used.component.html',
  styleUrls: ['./tools-used.component.scss']
})
export class ToolsUsedComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Tools Used");
  }

}
