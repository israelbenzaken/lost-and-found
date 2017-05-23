import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {

	@ViewChild('f') signupForm: NgForm;
	Anotherchoice = '';
	defaultType = "phone";
	user = {
		objType: '',
		Description: '',
		locationFound:''
	};
	submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
		this.submitted = true;
		this.user.objType = this.signupForm.value.objType;
		this.user.Description = this.signupForm.value.Description;
		this.user.locationFound = this.signupForm.value.locationFound;

		this.signupForm.reset();
	}

}
