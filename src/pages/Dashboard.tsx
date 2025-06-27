import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  LinearProgress,
} from "@mui/material";
import {
  Storage,
  Memory,
  Computer,
  Schedule,
  DnsOutlined,
} from "@mui/icons-material";

interface ServerStats {
  serverId: string;
  hddUsage: number;
  hddTotal: number;
  ramUsage: number;
  ramTotal: number;
  cpuUsage: number;
  uptime: string;
}

function Dashboard(): JSX.Element {
  const [apiResponse, setApiResponse] = useState<string>("");

  // Mock data - replace with actual API calls
  const serverStats: ServerStats = {
    serverId: "VPS-12345",
    hddUsage: 45.2,
    hddTotal: 100,
    ramUsage: 2.1,
    ramTotal: 4,
    cpuUsage: 23,
    uptime: "15 days, 3 hours",
  };

  const hddPercent = (serverStats.hddUsage / serverStats.hddTotal) * 100;
  const ramPercent = (serverStats.ramUsage / serverStats.ramTotal) * 100;

  const handleRefresh = async () => {
    const apiKey = localStorage.getItem("apiKey");
    const serverId = localStorage.getItem("serverId");

    if (!apiKey || !serverId) {
      setApiResponse("API key or Server ID not set.");
      return;
    }

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("srv", serverId);

    console.log("fetching https://api.mikr.us/info");
    console.log("formData", formData);

    const apiUrl = import.meta.env.DEV
      ? "/api/info"
      : "https://api.mikr.us/info";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setApiResponse("Error: " + (err as Error).message);
    }
  };

  return (
    <Container maxWidth="lg">
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
        <button onClick={handleRefresh}>Refresh</button>
      </Box>
      {/* API Response */}
      {apiResponse && (
        <Box mb={3}>
          <Typography
            variant="body2"
            component="pre"
            sx={{
              background: "#222",         // Dark background
              color: "#fff",              // White text
              p: 2,
              borderRadius: 1,
              fontFamily: "monospace",    // Monospace for code
              fontSize: "1rem",
              overflowX: "auto"
            }}
          >
            {apiResponse}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <DnsOutlined color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Server ID</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {serverStats.serverId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Storage color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">HDD Space</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {hddPercent.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {serverStats.hddUsage} GB / {serverStats.hddTotal} GB
              </Typography>
              <LinearProgress
                variant="determinate"
                value={hddPercent}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Memory color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">RAM Usage</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {ramPercent.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {serverStats.ramUsage} GB / {serverStats.ramTotal} GB
              </Typography>
              <LinearProgress
                variant="determinate"
                value={ramPercent}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Computer color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">CPU Usage</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {serverStats.cpuUsage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={serverStats.cpuUsage}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Schedule color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Uptime</Typography>
              </Box>
              <Typography variant="h5" color="primary">
                {serverStats.uptime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
