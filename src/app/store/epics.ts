import { Injectable } from '@angular/core';

import { ANIMAL_TYPE } from '../animals/model';
import { AnimalAPIEpics } from '../animals/api/epics';

@Injectable()
export class RootEpics {
  constructor(private animalEpics: AnimalAPIEpics) {
  }

  public createEpics() {
    return [
      this.animalEpics.createEpic(ANIMAL_TYPE.ELEPHANT),
      this.animalEpics.createEpic(ANIMAL_TYPE.LION),
    ];
  }
}
