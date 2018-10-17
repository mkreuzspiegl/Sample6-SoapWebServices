import { NgxSoapService } from 'ngx-soap';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class SoapHelper {
  private url: string;
  private soap: NgxSoapService;
  private client: any = null;
  private isLoadClient = false;

  constructor(url: string, soap: NgxSoapService) {
    this.soap = soap;
    this.url = url;
    this.loadClient();
  }

  private loadClient() {
    this.isLoadClient = true;
    this.soap.createClient(this.url)
      .then(client => {
        console.log('SoapHelper.client=', client);
        this.isLoadClient = false;
        this.client = client;
      })
      .catch(err => {
        console.log('Error', err);
        this.isLoadClient = false;
        this.client = null;
      });
  }

  public call(name: string, body: Object = {}): Observable<any> {
    if (!this.client) {
      setTimeout(() => {
        return this.call(name, body);
      }, 500);
      return false;
    }
    this.client.Observable(this.client.call(name, body));
    return this.client.call(name, body);
    this.soap.o
  }
}
