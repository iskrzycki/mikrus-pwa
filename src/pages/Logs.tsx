import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Divider,
} from "@mui/material";

import { Refresh as RefreshIcon } from "@mui/icons-material";
import { getLogs } from "../utils";
import { useLogsStore } from "../store/logsStore";

const Logs: FC = () => {
  const { t } = useTranslation();
  const apiResponse = useLogsStore((state) => state.apiResponse);
  const setApiResponse = useLogsStore((state) => state.setApiResponse);
  const lastFetch = useLogsStore((state) => state.lastFetch);
  const setLastFetch = useLogsStore((state) => state.setLastFetch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Logs rendered with data:", apiResponse);

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
      const response = await getLogs(apiKey, serverId);
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
        {t("logs.title")}
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
        {t("logs.refresh")}
      </Button>
      {lastFetch && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t("logs.lastUpdate", { value: lastFetch.toLocaleString() })}
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
            bgcolor: "#e3f2fd",
            borderRadius: 3,
            boxShadow: 4,
            border: "1.5px solid #90caf9",
            p: 0,
            mt: 2,
          }}
        >
          {apiResponse.map((x) => (
            <>
              <ListItem sx={{ py: 1, px: 2, minHeight: 0 }}>
                <ListItemText
                  primary={`${x.when_created}: ${x.task}`}
                  secondary={x.output}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default Logs;
