import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favouriteCharacters';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private storage: Storage) { }

  getAllFavouriteCharacters() {
    return this.storage.get(STORAGE_KEY)
  }

  isFavourite(characterId) {
    return this.getAllFavouriteCharacters().then(result => {
      return result && result.indexOf(characterId) !== -1;
    });
  }

  favouriteCharacter(characterId) {
    return this.getAllFavouriteCharacters().then(result => {
      if (result) {
        result.push(characterId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [characterId]);
      }
    });
  }

  unfavouriteCharacter(characterId) {
    return this.getAllFavouriteCharacters().then(result => {
      if (result) {
        var index = result.indexOf(characterId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

}
