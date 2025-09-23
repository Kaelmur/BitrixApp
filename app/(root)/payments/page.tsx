"use client";

import { payments } from "@/app/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export default function PaymentsPage() {
  return (
    <div>
      <main className="p-6 bg-gray-50 min-h-screen">
        <Typography variant="h4" gutterBottom>
          Платежи
        </Typography>

        <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер счета</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell
                    sx={{
                      color: payment.status === "paid" ? "#4f6ef7" : "#000",
                    }}
                  >
                    {payment.status === "paid" ? "Оплачено" : "Не оплачено"}
                  </TableCell>
                  <TableCell>
                    {payment.status === "unpaid" && (
                      <Button variant="contained" color="primary">
                        Оплатить
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}
