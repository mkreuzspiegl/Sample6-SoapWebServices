import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { SoapHelper } from './soap.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sample6-SoapWebServices';
  users$: Object;
  helloWorld$: Object;
  echo$: Object;


  client: Client;
  intA = 2;
  intB = 3;
  loading: boolean;
  showDiagnostic: boolean;
  message = '-->';
  message2 = '-->';
  xmlResponse: string;
  jsonResponse: string;
  resultLabel: string;


  constructor(private data: DataService) { }

  // constructor(private data: DataService, private soap: NgxSoapService) {
  //   this.soap.createClient('http://localhost:8080/MySoapSample/services/HelloWorld?wsdl')
  //     .then(client => {
  //       console.log('Client', client);
  //       this.client = client;
  //     })
  //     .catch(err => console.log('Error', err));
  // }

  // onHelloWorld() {
  //   this.loading = true;
  //   console.log('CALL CLIENT');
  //   this.client.call('helloWorld', {}).subscribe(res => {
  //     console.log('metod response - helloWorld - ', res);
  //     this.xmlResponse = res.xml;
  //     this.message = res.result.helloWorldReturn;
  //   }, err => console.log(err));
  //   this.client.call('echo', {echo: 'Max Muster'}).subscribe(res => {
  //     console.log('metod response - echo - ', res);
  //     this.xmlResponse = res.xml;
  //     this.message2 = res.result.echoReturn;
  //   }, err => console.log(err));
  // }
  // sum() {
  //   this.loading = true;

  //   const body = {
  //     intA: this.intA,
  //     intB: this.intB
  //   };
  //   this.client.call('Add', body).subscribe(res => {
  //     console.log('method response', res);
  //     this.xmlResponse = res.xml;
  //     this.message = res.result.AddResult;
  //     this.loading = false;
  //   }, err => console.log(err));
  // }
  ngOnInit(): void {
    console.log('app.ngOnInit: enter ...');

    console.log('app.ngOnInit: init "getUsers" ...');
    this.data.getUsers().subscribe(
      data => {
        console.log('asynchron getUsers-Task: enter ...');
        this.users$ = data;
        console.log(data);
        console.log('asynchron getUsers-Task: exit!');
      }
    );

    console.log('app.ngOnInit: init "getHelloWorld" ...');
    this.data.getHelloWorld().subscribe(
      data => {
        console.log('asynchron getHelloWorld-data-Task: enter ...');
        //        this.users$ = data;
        console.log(data);
        const domParser = new DOMParser();
        const docData: Document = domParser.parseFromString(data, 'text/xml');
        const nodeValue: Node = docData.evaluate('*/*/*/*', docData, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        console.log(nodeValue);
        this.helloWorld$ = nodeValue.nodeName + ' = ' + nodeValue.textContent;


        console.log('asynchron getHelloWorld-data-Task: exit!');
      },
      err => {
        console.log('asynchron getHelloWorld-err-Task: enter ...');
        console.log(err);
        console.log('asynchron getHelloWorld-err-Task: exit!');
      }
    );

    console.log('app.ngOnInit: init "getEcho" ...');
    this.data.getEcho('Max MUSTER')
      .subscribe(
        data => {
          console.log('asynchron getEcho-data-Task: enter ...');
          //        this.users$ = data;
          console.log(data);
          const domParser = new DOMParser();
          const docData: Document = domParser.parseFromString(data, 'text/xml');
          const nodeValue: Node = docData.evaluate('*/*/*/*', docData, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          console.log(nodeValue);
          this.echo$ = nodeValue.nodeName + ' = ' + nodeValue.textContent;


          console.log('asynchron getEcho-data-Task: exit!');
        },
        err => {
          console.log('asynchron getEcho-err-Task: enter ...');
          console.log(err);
          console.log('asynchron getEcho-err-Task: exit!');
        }
      );


    console.log('app.ngOnInit: init "getHelloWorld2" ...');
    this.data.getHelloWorld2()
      .subscribe(res => {
        console.log('method response --------------------', res);
        // this.message = res
      },
        err => console.log(err));

    // this.helloWorld();
    console.log('app.ngOnInit: exit!');
  }
}
