import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/joy/Box';


function createData(
  id: string,
  name: string,
  date: string,
  doctor: string,

  
) {
    const history = [
        {
        drug: 'Abacavir 20mg/ml oral soln',
        usage: 'Take 2 before breakfast',
        quantity: 3,
        total_price: 1036.5

        },
        {
        drug: 'Acamprosate calcium 333mg dr tab',
        usage: 'Take 1 before bed',
        quantity: 2,
        total_price: 691
        
        }
    ];
  const total_amount = history.reduce((sum, item) => sum + item.total_price, 0);
  return {
    id,
    name,
    date,
    doctor,
    total_amount,
    history
  };
}

function Row(props: { row: ReturnType<typeof createData>; initialOpen?: boolean }) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th style={{ fontSize: '13px'}}scope="row">{row.id}</th>
        <td style={{ fontSize: '13px'}}>{row.name}</td>
        <td style={{ fontSize: '13px'}}>{row.date}</td>
        <td style={{ fontSize: '13px', fontWeight: 'bold'}}>{row.total_amount}</td>
        
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={5}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                Prescription details
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="prescription-details"
                stickyHeader={false}
                sx={{
                    mt: 2,
                    '& > thead':
                    { position: 'sticky', top: 0},
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.5rem',
                }}
              >
                <thead>
                  <tr>
                    <th>Drug name</th>
                    <th>Usage</th>
                    <th>Quantity</th>
                    <th>Total price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {row.history.map((historyRow) => (
                    <>
                      <tr key={historyRow.drug}>
                        <th scope="row">{historyRow.drug}</th>
                        <td>{historyRow.usage}</td>
                        <td>{historyRow.quantity}</td>
                        <td>
                            {historyRow.total_price}
                        </td>
                    
                      </tr>
                      
                    </>
                  ))}
                  
                </tbody>
              </Table>
              <Box sx={{ mt: 2, display: 'flex', p: 2, justifyContent: 'flex-end'}}>
                <Typography sx={{fontSize: '12px'}}>
                    Doctor's Signature: 
                    <Typography color='primary' sx={{fontFamily: 'Grey Qo', p:2, fontSize: '20px'}}>{row.doctor}</Typography></Typography>
              </Box>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

const rows = [
  createData('PAT-001','Mrs. Jemma Rawlings', 'August 24, 2024', 'Dr. Audrey McGriffen'),
  createData('PAT-002','Olivia Ryhe', 'August 24, 2024', 'Dr. Audrey McGriffen'),
  createData('PAT-003','Steven Hampton', 'August 24, 2024', 'Dr. Audrey McGriffen'),
  createData('PAT-004','Claran Murray', 'August 24, 2024', 'Dr. Audrey McGriffen'),
  createData('PAT-005','Maria McDonald', 'August 24, 2024', 'Dr. Audrey McGriffen'),
];

export default function PrescriptionsTable() {
 
  return (
    <Sheet sx={{overflowY: 'auto'}}>
      <Table
        aria-label="collapsible table"
        stickyHeader
        sx={{
         
          '& > thead > tr > th:nth-child(n + 5), & > tbody > tr > td:nth-child(n + 5)':
                    { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
            {
              borderBottom: 0,
            },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: 100, fontSize: '16px'}}>ID</th>
            <th style={{ width: '40%', fontSize: '16px'}}>Patient</th>
            <th style={{ fontSize: '16px'}}>Date</th>
            <th style={{ fontSize: '16px'}}>Total Amount($)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={row.name} row={row} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
      
    </Sheet>
  );
}
