import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSoapService } from 'ngx-soap';
import { Observable } from 'rxjs';
import { SoapHelper } from './soap.helper';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private clientHelloWorld: any;

  constructor(private http: HttpClient, private soap: NgxSoapService) {
    // READ / PARSE WSDL ------------------------------
    // this.soap.createClient('http://localhost:8080/MySoapSample/services/HelloWorld?wsdl')
    //   .then(client => {
    //     console.log('clientHelloWorld', client);
    //     this.clientHelloWorld = client;
    //   })
    //   .catch(err => {
    //     console.log('Error', err);
    //   });
  }

  getHelloWorld2(): Observable<any> {

    const soapHelper = new SoapHelper('http://localhost:8080/MySoapSample/services/HelloWorld?wsdl', this.soap);
    return soapHelper.call('helloWorld');
  }


  getUsers(): Observable<any> {
    console.log('data.getUsers: enter/exit ...');
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  getHelloWorld(): Observable<any> {
    // ACHTUNG:
    // POSTs müssen auf dem selben Host und Port ausgeführt werden
    // ansonst können Browser wie Chrome den Zugriff nicht durchführen.
    // Fehler = Access-Control-Allow-Origin
    // Bei Chrome muss z.B. die Web-Security deaktiviert werden
    // /Applications/Google\ Chrome.app/Contents/MacOS/GoogleChrome --disable-web-security --user-data-dir="test"
    console.log('data.getHelloWorld: enter ...');
    const url = 'http://localhost:8080/MySoapSample/services/HelloWorld';
    const body: any = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:kre="http://kreuzspiegl.at">
  <soapenv:Header/>
  <soapenv:Body>
    <kre:helloWorld/>
  </soapenv:Body>
 </soapenv:Envelope>`;

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('SOAPAction', '')
        .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method')
      , responseType: 'text' as 'text'
    };

    console.log('data.getHelloWorld: exit!');
    return this.http.post(url, body, options);
  }
  getEcho(echo: string): Observable<any> {
    // ACHTUNG:
    // POSTs müssen auf dem selben Host und Port ausgeführt werden
    // ansonst können Browser wie Chrome den Zugriff nicht durchführen.
    // Fehler = Access-Control-Allow-Origin
    // Bei Chrome muss z.B. die Web-Security deaktiviert werden
    // /Applications/Google\ Chrome.app/Contents/MacOS/GoogleChrome --disable-web-security --user-data-dir="test"
    console.log('data.getEcho: enter ...');
    const url = 'http://localhost:8080/MySoapSample/services/HelloWorld';
    const body: any = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:kre="http://kreuzspiegl.at">
    <soapenv:Header/>
    <soapenv:Body>
       <kre:echo>
          <kre:echo>${ echo}</kre:echo>
       </kre:echo>
    </soapenv:Body>
 </soapenv:Envelope>`;

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('SOAPAction', '')
        .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method')
      , responseType: 'text' as 'text'
    };

    console.log('data.getEcho: exit!');
    return this.http.post(url, body, options);
  }

}
