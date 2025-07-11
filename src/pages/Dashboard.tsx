import { useState } from "react";
import type { FC } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import {
  Box,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";

import {
  Storage,
  Memory,
  DnsOutlined,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { getServerInfo } from "../utils";


const Dashboard: FC = () => {
  const apiResponse = useDashboardStore((state) => state.apiResponse);
  const setApiResponse = useDashboardStore((state) => state.setApiResponse);
  const lastFetch = useDashboardStore((state) => state.lastFetch);
  const setLastFetch = useDashboardStore((state) => state.setLastFetch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hdd = apiResponse?.disk && apiResponse.disk[0];
  const hddPercent = hdd ? (hdd.used / hdd.size) * 100 : 0;
  const ramPercent = apiResponse?.memory ? (apiResponse.memory.used / apiResponse.memory.total) * 100 : 0;


  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(undefined);
    setLastFetch(null);
    const apiKey = localStorage.getItem("apiKey");
    const serverId = localStorage.getItem("serverId");

    if (!apiKey || !serverId) {
      setError("API key or Server ID not set.");
      setLoading(false);
      return;
    }

    try {
      const response = await getServerInfo(apiKey, serverId);
      setApiResponse(response);
      setLastFetch(new Date());
    } catch (err) {
      setError("Error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <Paper elevation={3} sx={{
      width: '90vw',
      height: 'calc(100vh - 120px)',
      mt: 3,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
    }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 4, mb: 3 }}
      >
        Server Dashboard
      </Typography>

      {/* Refresh Button */}
      <Box mb={3}>
        <Button
          onClick={handleRefresh}
          disabled={loading}
          color="primary"
          variant="outlined"
          startIcon={<RefreshIcon />}
          size="large"
          aria-label="refresh"
          sx={{ borderRadius: 2, minWidth: 48, minHeight: 48, px: 2 }}
        >
          Odśwież
        </Button>
        {loading && (
          <Box display="inline" ml={2}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {/* Last fetch date */}
      {lastFetch && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          Ostatnie pobranie danych: {lastFetch.toLocaleString()}
        </Typography>
      )}

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {apiResponse && !loading && !error && (
        <List
          sx={{
            bgcolor: '#e3f2fd',
            borderRadius: 3,
            boxShadow: 4,
            border: '1.5px solid #90caf9',
            p: 0,
            mt: 2,
          }}
        >
          <ListItem sx={{ py: 1, px: 2, minHeight: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DnsOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={apiResponse.server_id}
              secondary={
                <Typography variant="body2" color="primary">
                  Uptime: {apiResponse.uptime}
                </Typography>
              }
            />
            {/* <ListItemText
              primary="Uptime"
              secondary={
                <Typography variant="h6" color="primary">
                  {apiResponse.uptime}
                </Typography>
              }
            /> */}
          </ListItem>
          <Divider component="li" />

          <ListItem sx={{ py: 1, px: 2, minHeight: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Storage color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="HDD Space"
              secondary={
                <>
                  <Typography variant="body2" color="primary">
                    {hddPercent.toFixed(1)}% ({hdd?.used} GB / {hdd?.size} GB)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={hddPercent}
                    sx={{ mt: 1, height: 8, borderRadius: 1, bgcolor: "#e3f2fd" }}
                  />
                </>
              }
            />
          </ListItem>
          <Divider component="li" />

          <ListItem sx={{ py: 1, px: 2, minHeight: 0, width: '100%' }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Memory color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="RAM Usage"
              secondary={
                <>
                  <Typography variant="body2" color="primary">
                    {ramPercent.toFixed(1)}% ({apiResponse.memory?.used} MB / {apiResponse.memory?.total} MB)
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={ramPercent}
                    sx={{ mt: 1, height: 8, borderRadius: 1, bgcolor: "#e3f2fd" }}
                  />
                </>
              }
            />
          </ListItem>
        </List>
      )}
    </Paper>


  );
};

export default Dashboard;
