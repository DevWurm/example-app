import { Injectable } from '@angular/core';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/startWith';

import { IAppState } from '../../store/model';
import { ANIMAL_TYPE } from '../model';
import { AnimalAPIActions, AnimalAPIActionTypes, LoadAnimalsActions } from './actions';
import { AnimalAPIService } from './service';

const animalsNotAlreadyFetched = (
  animalType: ANIMAL_TYPE,
  state: IAppState): boolean => !(
  state[animalType] &&
  state[animalType].items &&
  Object.keys(state[animalType].items).length);

const actionIsForCorrectAnimalType = (animalType: ANIMAL_TYPE) =>
  (action: LoadAnimalsActions): boolean =>
    action.metadata.animalType === animalType;

@Injectable()
export class AnimalAPIEpics {
  constructor(
    private service: AnimalAPIService,
    private actions: AnimalAPIActions,
  ) {
  }

  public createEpic(animalType: ANIMAL_TYPE) {
    return createEpicMiddleware(this.createLoadAnimalEpic(animalType));
  }

  private createLoadAnimalEpic(animalType: ANIMAL_TYPE): Epic<LoadAnimalsActions, IAppState> {
    return (action$, store) => action$
      .ofType(AnimalAPIActionTypes.LOAD_ANIMALS)
      .filter(action => actionIsForCorrectAnimalType(animalType)(action))
      .filter(() => animalsNotAlreadyFetched(animalType, store.getState()))
      .switchMap(() => this.service.getAll(animalType)
        .map(data => this.actions.loadSucceeded(animalType, data))
        .catch(response => of(this.actions.loadFailed(animalType, {
          status: '' + response.status,
        })))
        .startWith(this.actions.loadStarted(animalType) as any));
  }
}
