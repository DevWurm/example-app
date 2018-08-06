import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { createAnimalAPIReducer } from '../animals/api/reducer';
import { ANIMAL_TYPE } from '../animals/model';

// TODO: action type
export type Reducer<S> = (state: S, action) => S;

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    elephant: createAnimalAPIReducer(ANIMAL_TYPE.ELEPHANT),
    lion: createAnimalAPIReducer(ANIMAL_TYPE.LION),
    router: routerReducer,
  }));

export type Filter<T, U> = T extends U ? T : never;
