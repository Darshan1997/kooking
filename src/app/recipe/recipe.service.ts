import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  public getRecipe(): Observable<any> {
    return this.http.get("https://test-4ad0c.firebaseio.com/recipe.json")
      .pipe(map(response => {
        let recipeList = []
        for (let key in response) {
          recipeList.push(response[key])
        }
        return recipeList
      }))
  }

}
