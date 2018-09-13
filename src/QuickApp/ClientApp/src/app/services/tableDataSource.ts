import { DataSource } from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class TableDataSource extends DataSource<any> {
  public stylemasterlists$: Observable<any>;
  constructor(private stylemasterlists: Observable<any>) {
    super();
    this.stylemasterlists$ = stylemasterlists;
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.stylemasterlists$;
  }
  disconnect() {
  }
}
