import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Stomp} from '@stomp/stompjs';
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

  public subscribe(path: string): Observable<any>{
    return new Observable(observer => {
      this.checkConnection().subscribe(() => {
        this.client.subscribe(path, message => {
          observer.next(JSON.parse(message.body));
        });
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

  public send(path: string, object: any){
    this.client.send(path,{}, JSON.stringify(object));
  }

}
