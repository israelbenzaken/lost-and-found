import { Component, OnInit,ViewChild,ElementRef, NgZone } from '@angular/core';
import { NgForm ,FormControl} from '@angular/forms';
import { MapsAPILoader} from 'angular2-google-maps/core';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
	selector: 'app-lost',
	templateUrl: './lost.component.html',
	styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {

	// maps
	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;
	@ViewChild("search")
	public searchElementRef: ElementRef;


	@ViewChild('f') signupForm: NgForm;
	Anotherchoice = '';
	defaultType = "phone";
	user = {
		objType: '',
		Description: '',
		locationFound:''
	};
	submitted = false;

	constructor(
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone
		) {}

	ngOnInit() {
		this.zoom = 4;
		this.latitude = 39.8282;
		this.longitude = -98.5795;

		//create search FormControl
		this.searchControl = new FormControl();

		//set current position
		this.setCurrentPosition();

		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					//set latitude, longitude and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 12;
				});
			});
		});
	}

	private setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 14;
			});
		}
	}

	onSubmit() {
		this.submitted = true;
		this.user.objType = this.signupForm.value.objType;
		this.user.Description = this.signupForm.value.Description;
		this.user.locationFound = this.signupForm.value.locationFound;

		this.signupForm.reset();
	}

}
