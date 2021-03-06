import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../Services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
    selector: 'restaurantes-detail',
    templateUrl: "app/view/restaurante-detail.html",
    providers: [RestauranteService]
})
 
export class RestaurantesDetailComponent implements OnInit {
	public restaurante: Restaurante[];
	public errorMessage: string;
	public status: string;

	constructor(private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router: Router)
	{}

	ngOnInit(){
		this.getRestaurante();
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		let random = this._routeParams.get("random");

		this._restauranteService.getRestaurante(id, random).subscribe(
					response => {
						this.restaurante = response.data;
						this.status = response.status;

						if(this.status !== "success"){
							//alert("Error en el Servidor");
							this._router.navigate(["Home"]);
						}	

					},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage !== null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
				)
	}
}