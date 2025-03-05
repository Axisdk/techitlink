import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessageModalService {

  public isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {}

  public toggleModal() {
    this.isOpen$.next(!this.isOpen$.value);
    console.log(this.isOpen$.value)
  }

}
