import { AnimalAPIActionTypes, LoadAnimalsActions } from './actions';
import { AnimalType, IAnimalList } from '../model';
import { indexBy, prop } from 'ramda';
import { Action } from '../../store/actions';
import { Filter, Reducer } from '../../store/reducers';

const INITIAL_STATE: IAnimalList = {
  items: {},
  loading: false,
  error: null,
};
// A higher-order reducer: accepts an animal type and returns a reducer
// that only responds to actions for that particular animal type.
export function createAnimalAPIReducer(animalType: AnimalType): Reducer<IAnimalList> {
  return function animalReducer(state: IAnimalList = INITIAL_STATE,
                                action: LoadAnimalsActions | Filter<Action<string>, LoadAnimalsActions>): IAnimalList {

    if (!action.metadata || action.metadata.animalType !== animalType) {
      return state;
    }

    switch (action.type) {
      case AnimalAPIActionTypes.LOAD_STARTED:
        return {
          ...state,
          items: {},
          loading: true,
          error: null,
        };
      case AnimalAPIActionTypes.LOAD_SUCCEEDED:
        return {
          ...state,
          items: indexBy(prop('id'), action.payload),
          loading: false,
          error: null,
        };
      case AnimalAPIActionTypes.LOAD_FAILED:
        return {
          ...state,
          items: {},
          loading: false,
          error: action.error,
        };
    }

    return state;
  };
}
