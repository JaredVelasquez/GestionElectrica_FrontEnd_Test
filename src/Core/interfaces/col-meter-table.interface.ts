import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { DataMeter } from './meter.interface';

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<DataMeter> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<DataMeter> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
  }