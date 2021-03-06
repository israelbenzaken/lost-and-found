import { Component, OnInit,ViewChild,ElementRef, NgZone } from '@angular/core';
import { NgForm ,FormControl} from '@angular/forms';
import { MapsAPILoader} from 'angular2-google-maps/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
	selector: 'app-found',
	templateUrl: './found.component.html',
	styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit {

	item: FirebaseListObservable <any>;

	// maps
	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;
	@ViewChild("search")
	public searchElementRef: ElementRef;


	@ViewChild('f') signupForm: NgForm;
	Description = '';
	defaultType = "computer";
	user = {
		Yourname: '',
		phoneNumber:'',
		email: '',
		objType: '',
		Description: '',
		locationFound:''
	};
	submitted = false;


	constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,db: AngularFireDatabase){
		this.item = db.list('/foundList');
	}

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
		this.user.Yourname = this.signupForm.value.userData.Yourname;
		this.user.phoneNumber = this.signupForm.value.userData.phoneNumber;
		this.user.email = this.signupForm.value.userData.email;
		this.user.objType = this.signupForm.value.objType;
		this.user.Description = this.signupForm.value.Description;
		this.user.locationFound = this.signupForm.value.locationFound;

		this.item.push({ name: this.signupForm.value.userData.Yourname,
			phone : this.signupForm.value.userData.phoneNumber,
			email: this.signupForm.value.userData.email,
			objType : this.signupForm.value.objType,
			Description : this.signupForm.value.Description,
			locationFound: this.signupForm.value.locationFound
		});

		this.signupForm.reset();
	}

}
