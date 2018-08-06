import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ANIMAL_TYPE, fromServer, IAnimal } from '../model';

// A fake API on the internets.
const URLS = {
  [ANIMAL_TYPE.ELEPHANT]: 'http://www.mocky.io/v2/59200c34110000ce1a07b598',
  [ANIMAL_TYPE.LION]: 'http://www.mocky.io/v2/5920141a25000023015998f2',
};

@Injectable()
export class AnimalAPIService {
  constructor(private http: Http) {
  }

  getAll = (animalType: ANIMAL_TYPE): Observable<IAnimal[]> =>
    this.http.get(URLS[animalType])
      .map(resp => resp.json())
      .map(records => records.map(fromServer));
}
