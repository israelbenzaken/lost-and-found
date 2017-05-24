import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  relative(event){
  	if (event.target.text.indexOf("Found") > -1 ) {
  		this.router.navigate(['/found']);
  	}
  	else if(event.target.text.indexOf("Lost") > -1){
  		this.router.navigate(['/lost']);
  	}
  	
  }

}
