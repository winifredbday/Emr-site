import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/joy/Box';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import Button from '@mui/joy/Button';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';

interface History {
  drug: string;
  usage: string;
  quantity: number;
  total_price: number;
}

interface RowData {
  id: string;
  name: string;
  date: string;
  doctor: string;
  total_amount: number;
  history: History[];
}

// Function to download the PDF
const downloadPDF = (row: RowData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  pdf.text(`${row.name}'s Prescription History`, 14, 22);

  const columns = [
    { header: 'Drug name', dataKey: 'drug' },
    { header: 'Usage', dataKey: 'usage' },
    { header: 'Quantity', dataKey: 'quantity' },
    { header: 'Total price ($)', dataKey: 'total_price' },
  ];

  const rows = row.history.map((historyItem) => ({
    drug: historyItem.drug,
    usage: historyItem.usage,
    quantity: historyItem.quantity,
    total_price: historyItem.total_price.toFixed(2),
  }));

  (pdf as any).autoTable({
    startY: 30,
    head: [columns.map(col => col.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
  });

  const signatureElement = document.getElementById('signature');
  if (signatureElement) {
    html2canvas(signatureElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', pageWidth - 60 - 10, (pdf as any).autoTable.previous.finalY + 10, 65, 10);
      pdf.save(`${row.name}_Prescription_History.pdf`);
    }).catch(error => {
      console.error('Error capturing signature:', error);
    });
  } else {
    pdf.save(`${row.name}_Prescription_History.pdf`);
  }
};

function Row(props: { row: RowData; initialOpen?: boolean }) {
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
        <th style={{ fontSize: '13px' }} scope="row">{row.id}</th>
        <td style={{ fontSize: '13px' }}>{row.name}</td>
        <td style={{ fontSize: '13px' }}>{row.date}</td>
        <td style={{ fontSize: '13px', fontWeight: 'bold' }}>{row.total_amount}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={5}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
              id={`history-${row.id}`}
            >
              <Typography level="body-lg" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Prescription details
                <Button startDecorator={<PrintRoundedIcon />} onClick={() => downloadPDF(row)}>Print</Button>
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="prescription-details"
                stickyHeader={false}
                sx={{
                  mt: 2,
                  '& > thead': { position: 'sticky', top: 0 },
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)': { textAlign: 'right' },
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
                    <tr key={historyRow.drug}>
                      <th scope="row">{historyRow.drug}</th>
                      <td>{historyRow.usage}</td>
                      <td>{historyRow.quantity}</td>
                      <td>{historyRow.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Box sx={{ mt: 2, display: 'flex', p: 2, justifyContent: 'flex-end' }}>
                <Typography id="signature" sx={{ fontSize: '12px' }}>
                  Doctor's Signature:
                  <Typography color='primary' sx={{ fontFamily: 'Grey Qo', p: 2, fontSize: '20px' }}>{row.doctor}</Typography>
                </Typography>
              </Box>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

export default function PrescriptionsTable() {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    axios.get('https://emr-backend.up.railway.app/clinic/prescriptions/')
      .then(response => {
        const prescriptions = response.data.map((prescription: any) => {
          const totalAmount = prescription.drugs.reduce((sum: number, drug: any) => sum + parseFloat(drug.total_price), 0);
          return {
            id: prescription.id,
            name: `${prescription.patient.firstName} ${prescription.patient.lastName}`,
            date: new Date(prescription.date_prescribed).toLocaleDateString(),
            doctor: `${prescription.doctor.firstName} ${prescription.doctor.lastName}`,
            total_amount: totalAmount,
            history: prescription.drugs.map((drug: any) => ({
              drug: drug.name,
              usage: drug.direction,
              quantity: drug.quantity,
              total_price: parseFloat(drug.total_price),
            })),
          };
        });
        setRows(prescriptions);
      })
      .catch(error => {
        console.error('Error fetching prescriptions:', error);
      });
  }, []);

  return (
    <Sheet sx={{ overflowY: 'auto' }}>
      <Table
        aria-label="collapsible table"
        stickyHeader
        sx={{
          '& > thead > tr > th:nth-child(n + 5), & > tbody > tr > td:nth-child(n + 5)': { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]': { borderBottom: 0 },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: 100, fontSize: '16px' }}>ID</th>
            <th style={{ width: '40%', fontSize: '16px' }}>Patient</th>
            <th style={{ fontSize: '16px' }}>Date</th>
            <th style={{ fontSize: '16px' }}>Total Amount($)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row key={row.id} row={row} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
