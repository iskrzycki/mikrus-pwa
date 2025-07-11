import type { FC } from "react";
import { Box, Typography } from "@mui/material";

const NotImplemented: FC<{ label?: string }> = ({ label }) => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h5" color="text.secondary" gutterBottom>
      {label ? `${label}: ` : ''}Not implemented yet
    </Typography>
  </Box>
);

export default NotImplemented;
