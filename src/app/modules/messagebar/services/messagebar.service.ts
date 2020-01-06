import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Message} from "../interfaces/messagebar/message.interface";

@Injectable()
export class MessagebarService {
    message$ = new Subject();

    constructor() {
    }

    addMessage(message: Message) {
        this.message$.next(message);
    }

    getMessage(){
        return this.message$;
    }
}
