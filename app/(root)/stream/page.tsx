"use client";

import { Box, Typography, Card, CardMedia } from "@mui/material";

export default function StreamPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "left",
        }}
      >
        Трансляция
      </Typography>

      <Card
        sx={{
          flexGrow: 1,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          image="/assets/images/fixing.gif"
          alt="Stream"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Card>
    </Box>
  );
}
