import { BehaviorSubject } from 'rxjs';

const subscriber = new BehaviorSubject(null);

export const messageService = {
    sendMessage: message => subscriber.next({ text: message }),
    clearMessages: () => subscriber.next(),
    getMessage: () => subscriber.asObservable()
};
