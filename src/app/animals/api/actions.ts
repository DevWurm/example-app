import { Injectable } from '@angular/core';
import { ANIMAL_TYPE, IAnimal } from '../model';
import { ActionCreator, Dispatchable, MetadataAction, PayloadMetadataAction } from '../../store/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/model';

export enum AnimalAPIActionTypes {
  LOAD_ANIMALS = 'animals/api::LOAD_ANIMALS',
  LOAD_STARTED = 'animals/api::LOAD_STARTED',
  LOAD_SUCCEEDED = 'animals/api::LOAD_SUCCEEDED',
  LOAD_FAILED = 'animals/api::LOAD_FAILED',
}

export interface AnimalTypeMetadata {
  animalType: ANIMAL_TYPE;
}

export interface LoadAnimalsAction extends MetadataAction<AnimalAPIActionTypes.LOAD_ANIMALS, AnimalTypeMetadata> {
}

export interface LoadAnimalsStartedAction extends MetadataAction<AnimalAPIActionTypes.LOAD_STARTED, AnimalTypeMetadata> {
}

export interface LoadAnimalsSucceededAction extends PayloadMetadataAction<AnimalAPIActionTypes.LOAD_SUCCEEDED, IAnimal[], AnimalTypeMetadata> {
}

export interface LoadAnimalsFailedAction extends MetadataAction<AnimalAPIActionTypes.LOAD_FAILED, AnimalTypeMetadata> {
}

export type LoadAnimalsActions = LoadAnimalsAction | LoadAnimalsStartedAction | LoadAnimalsSucceededAction | LoadAnimalsFailedAction;

@Injectable()
export class AnimalAPIActions extends ActionCreator<AnimalAPIActions, IAppState> {
  constructor(protected ngRedux: NgRedux<IAppState>) {
    super();
  }

  @Dispatchable()
  loadAnimals(animalType: ANIMAL_TYPE): LoadAnimalsAction {
    return {
      metadata: { animalType },
      type: AnimalAPIActionTypes.LOAD_ANIMALS,
    };
  }

  @Dispatchable()
  loadStarted(animalType: ANIMAL_TYPE): LoadAnimalsStartedAction {
    return {
      metadata: { animalType },
      type: AnimalAPIActionTypes.LOAD_STARTED,
    };
  }

  @Dispatchable()
  loadSucceeded(animalType: ANIMAL_TYPE, payload: IAnimal[]): LoadAnimalsSucceededAction {
    return {
      metadata: { animalType },
      type: AnimalAPIActionTypes.LOAD_SUCCEEDED,
      payload,
    };
  }

  @Dispatchable()
  loadFailed(animalType: ANIMAL_TYPE, error): LoadAnimalsFailedAction {
    return {
      metadata: { animalType },
      type: AnimalAPIActionTypes.LOAD_FAILED,
      error,
    };
  }
}
