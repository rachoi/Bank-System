import React, {useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Id', width:90 },
  {
    field: 'type',
    headerName: 'Type',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 110,
  },
  {
    field: 'from',
    headerName: 'From',
    width: 150,
  },
  {
    field: 'to',
    headerName: 'To',
    width: 110,
  },
  
  {
    field: 'note',
    headerName: 'Note',
    width: 200,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 150,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
];


export default function DataGridDemo(props) {

  const [rows, setRows] = React.useState(props.rows);

  useEffect( () => {
    setRows(props.rows);
  }, [props.rows])


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}