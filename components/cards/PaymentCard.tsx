"use client";

import { filterPayments, sortPayments, statusMap } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Box,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";

function PaymentCard() {
  const [filter, setFilter] = useState("Все платежи");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredPayments = filterPayments(filter);

  const sortedPayments = sortPayments(filteredPayments, sortConfig);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Paper elevation={3} className="p-6 rounded-2xl lg:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center mb-6">
          <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
          <h2 className="text-xl font-bold">Платежи</h2>
        </div>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              "& .MuiSelect-select": { py: 1.2, px: 2 },
              "&:hover": { backgroundColor: "#e0e0e0" },
              boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
            }}
          >
            <MenuItem value="Все платежи">
              Все платежи за последнюю неделю
            </MenuItem>
            <MenuItem value="Оплаченные">Оплаченные</MenuItem>
            <MenuItem value="Неоплаченные">Неоплаченные</MenuItem>
            <MenuItem value="В обработке">В обработке</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer
        sx={{ maxHeight: 3 * 64, overflowY: "auto", width: "100%" }}
      >
        <Table stickyHeader sx={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              {[
                { label: "Работник", key: "name" },
                { label: "Статус", key: "status" },
                { label: "Выполнено", key: "completed" },
                { label: "Действие", key: "" },
              ].map((h) => (
                <TableCell
                  key={h.label}
                  sx={{
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    fontWeight: 600,
                  }}
                >
                  {h.key ? (
                    <TableSortLabel
                      active={sortConfig?.key === h.key}
                      direction={sortConfig?.direction || "asc"}
                      onClick={() => requestSort(h.key)}
                    >
                      {h.label}
                    </TableSortLabel>
                  ) : (
                    h.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedPayments.map((payment) => {
              const { label, color, bg } = statusMap[payment.status];
              return (
                <TableRow key={payment.id} hover>
                  <TableCell sx={{ borderBottom: "none", py: 1.5 }}>
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={payment.employee.avatar}
                        alt={payment.employee.name}
                        sx={{ border: "1px solid #1976d2" }}
                      />
                      <div>
                        <Typography variant="body2" fontWeight="bold">
                          {payment.employee.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {payment.employee.email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell sx={{ borderBottom: "none", py: 1.5 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "16px",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        backgroundColor: bg,
                        color,
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: color,
                          display: "inline-block",
                        }}
                      />
                      {label}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ borderBottom: "none", py: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={payment.completed}
                          sx={{
                            flex: 1,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#26a443",
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          minWidth: 32,
                          textAlign: "right",
                        }}
                      >
                        {payment.completed}%
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ borderBottom: "none", py: 1.5 }}>
                    <Button variant="contained" color="primary" size="small">
                      Смотреть
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PaymentCard;
