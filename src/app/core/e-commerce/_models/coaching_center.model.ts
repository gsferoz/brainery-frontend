import { BaseModel } from '../../_base/crud';

export class CoachingCentreModel  extends BaseModel {
	name: string;
	center_code: string;
	registration_number: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	country: string;
	zip_code: string;
	contact_number: string;
	land_line_number: string;
	location_id: number;
	courses: [];


	clear() {
		this.name = '';
		this.center_code = '';
		this.registration_number = '';
		this.address1 = '';
		this.address2 = '';
		this.city = '';
		this.state = '';
		this.country = '';
		this.zip_code = '';
		this.contact_number		=    '';
		this.land_line_number	=  '';
		this.location_id			=  null;
		this.courses				=   [];
	}
}
