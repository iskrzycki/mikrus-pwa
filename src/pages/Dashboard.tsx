import { useState } from "react";
import type { FC } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDashboardStore } from "../store/dashboardStore";
import { useTranslation } from "react-i18next";
import {
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
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
  const { t } = useTranslation();
  const apiResponse = useDashboardStore((state) => state.apiResponse);
  const setApiResponse = useDashboardStore((state) => state.setApiResponse);
  const lastFetch = useDashboardStore((state) => state.lastFetch);
  const setLastFetch = useDashboardStore((state) => state.setLastFetch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hdd = apiResponse?.disk && apiResponse.disk[0];
  const hddPercent = hdd ? (hdd.used / hdd.size) * 100 : 0;
  const ramPercent = apiResponse?.memory
    ? (apiResponse.memory.used / apiResponse.memory.total) * 100
    : 0;

  const HDDdata = [
    { label: t("dashboard.hdd.available"), value: hdd?.available || 0, color: "#0088FE" },
    { label: t("dashboard.hdd.used"), value: hdd?.used || 0, color: "#00C49F" },
    { label: t("dashboard.hdd.reserved"), value: hdd?.reserved || 0, color: "#FFBB28" },
  ];

  const memoryData = [
    { label: t("dashboard.memory.used"), value: apiResponse?.memory?.used || 0, color: "#00C49F" },
    { label: t("dashboard.memory.free"), value: apiResponse?.memory?.free || 0, color: "#0088FE" },
    {
      label: t("dashboard.memory.buffCache"),
      value: apiResponse?.memory?.buffCache || 0,
      color: "#FFBB28",
    },
  ];

  const settings = {
    width: 200,
    height: 200,
  };

  console.log("Dashboard rendered with data:", apiResponse?.memory);

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
    <Paper
      elevation={3}
      sx={{
        width: "90vw",
        height: "calc(100% - 120px)",
        mt: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 4, mb: 3 }}
      >
        {t("dashboard.title")}
      </Typography>
      <Button
        onClick={handleRefresh}
        disabled={loading}
        color="primary"
        variant="outlined"
        loading={loading}
        startIcon={<RefreshIcon />}
        size="large"
        aria-label="refresh"
        sx={{ borderRadius: 2, minWidth: 48, minHeight: 48, px: 2, mb: 3 }}
      >
        {t("dashboard.refresh")}
      </Button>
      {lastFetch && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t("dashboard.lastUpdate", { value: lastFetch.toLocaleString() })}
        </Typography>
      )}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      {apiResponse && !loading && !error && (
        <>
          <List
            sx={{
              bgcolor: "#e3f2fd",
              borderRadius: 3,
              boxShadow: 4,
              border: "1.5px solid #90caf9",
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
                    {t("dashboard.info.uptime", { value: apiResponse.uptime })}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ py: 1, px: 2, minHeight: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Storage color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={t("dashboard.info.hdd")}
                secondary={
                  <>
                    <Typography variant="body2" color="primary">
                      {hddPercent.toFixed(1)}% ({hdd?.used} GB / {hdd?.size} GB)
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={hddPercent}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: "#e3f2fd",
                      }}
                    />
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ py: 1, px: 2, minHeight: 0, width: "100%" }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Memory color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={t("dashboard.info.ram")}
                secondary={
                  <>
                    <Typography variant="body2" color="primary">
                      {ramPercent.toFixed(1)}% ({apiResponse.memory?.used} MB /{" "}
                      {apiResponse.memory?.total} MB)
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={ramPercent}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: "#e3f2fd",
                      }}
                    />
                  </>
                }
              />
            </ListItem>
          </List>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 4, mb: 2, color: "text.secondary", fontWeight: 400 }}
          >
            {t("dashboard.hdd.chartTitle")}
          </Typography>
          <PieChart
            series={[
              {
                innerRadius: 50,
                outerRadius: 100,
                data: HDDdata,
                arcLabel: "value",
              },
            ]}
            {...settings}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 3, mb: 2, color: "text.secondary", fontWeight: 400 }}
          >
            {t("dashboard.memory.chartTitle")}
          </Typography>
          <PieChart
            series={[
              {
                innerRadius: 50,
                outerRadius: 100,
                data: memoryData,
                arcLabel: "value",
              },
            ]}
            {...settings}
          />
        </>
      )}
    </Paper>
  );
};

export default Dashboard;
