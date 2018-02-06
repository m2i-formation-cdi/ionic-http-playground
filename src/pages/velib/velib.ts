import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VelibMapPage } from '../velib-map/velib-map';
import { stagger } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the VelibPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-velib',
  templateUrl: 'velib.html',
})
export class VelibPage {

  constructor(public navCtrl: NavController, public http: Http) {
  }

  public stationList = [];
  private url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=100";

  ionViewDidLoad() {
    this.http.get(this.url).subscribe(
      (response) => {
        this.stationList = response.json().records;
      }
    );
  }

  goToMap(station){
    this.navCtrl.push(VelibMapPage, {station: station});
  }

}
