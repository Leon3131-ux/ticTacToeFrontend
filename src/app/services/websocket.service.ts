import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Stomp, StompSubscription} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  constructor(private authService: AuthService) {}

  client = Stomp.over(new SockJS(environment.websocket_url + '?Authorization=' + this.authService.getToken()));
  connecting = false;
  connectingSubject = new Subject();
  connected = false;
  subscriptions: StompSubscription[] = [];

  public subscribe(path: string): Observable<any>{
    return new Observable(observer => {
      this.checkConnection().subscribe(() => {
        let subscription = this.client.subscribe(path, message => {
          observer.next(JSON.parse(message.body));
        });
        this.subscriptions.push(subscription);
      })
    })
  }

  private checkConnection(): Observable<any>{
    return new Observable(observer => {
      if(!this.connected && !this.connecting){
        this.connecting = true;
        this.client.connect({}, () => {
          this.connected = true;
          this.connecting = false;
          this.connectingSubject.next();
          observer.next();
        });
      }else if(this.connecting){
        this.connectingSubject.subscribe(() => {
          observer.next();
        })
      }else if(this.connected){
        observer.next();
      }
    })
  }

  public connect(){
    this.checkConnection().subscribe(() => {})
  }

  public unsubscribeAll(): Observable<any>{
    return new Observable(observer => {
      for (let subscription of this.subscriptions){
        subscription.unsubscribe();
      }
      this.subscriptions = [];
      observer.next();
    })
  }

}
