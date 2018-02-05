import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';

/**
 * Generated class for the RandomUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-random-user',
  templateUrl: 'random-user.html',
})
export class RandomUserPage {

  private url:string = "https://randomuser.me/api";

  public user = {
    name: '',
    image: null
  };

  public userSelectedIndex;

  public selectedGender = 'all';
  public selectedCountryCodes = ['fr'];

  public countries = [
    {code: 'fr', label: 'France'},
    {code: 'gb', label: 'Royaume unis'},
    {code: 'us', label: 'Etats-unis'},
    {code: 'ch', label: 'Suisse'},
    {code: 'nz', label: 'Nouvelle Zélande'},
    {code: 'nl', label: 'Hollande'},
    {code: 'de', label: 'Allemagne'},
    {code: 'dk', label: 'Danemark'},
    {code: 'es', label: 'Espagne'},
    {code: 'br', label: 'Brésil'},
  ];

  public userList = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http:Http) {
  }

  ionViewDidLoad() {
    this.loadUsers( (data)=> {this.userList = data});
  }

  loadUsers(callback){
    let url = this.url + '?results=10'
    url += '&gender='+ this.selectedGender;
    url += '&nat='+ this.selectedCountryCodes.join(',');

    this.http.get(url).subscribe(
      (response) =>{
        let data = response.json().results;
        callback(data);
      }
    );
  }

  loadMore(infiniteScroll){
    this.loadUsers( (data)=> {
      this.userList = this.userList.concat(data);
      infiniteScroll.complete();
    });
  }

  refreshUsers(refresher){
    this.loadUsers( (data)=> {
      this.userList = data.concat(this.userList);
      refresher.complete();
    });
  }

  /**
   * 
   * @param pos Affichage du détails d'un utilisateur dans la liste
   */
  displayUserInfo(pos){
    this.userSelectedIndex = pos;
  }

  changeCountry(code){
    console.log(code);
  }

}
