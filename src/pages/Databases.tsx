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
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { Refresh as RefreshIcon, Storage as DatabaseIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { getDatabases } from "../utils";
import { useDatabasesStore } from "../store/databasesStore";
import styles from "./databases.module.css";

const Databases: FC = () => {
  const { t } = useTranslation();
  const apiResponse = useDatabasesStore((state) => state.apiResponse);
  const setApiResponse = useDatabasesStore((state) => state.setApiResponse);
  const lastFetch = useDatabasesStore((state) => state.lastFetch);
  const setLastFetch = useDatabasesStore((state) => state.setLastFetch);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Databases rendered with data:", apiResponse);

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
      const response = await getDatabases(apiKey, serverId);
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
        {t("databases.title")}
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
        {t("databases.refresh")}
      </Button>
      {lastFetch && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t("databases.lastUpdate", { value: lastFetch.toLocaleString() })}
        </Typography>
      )}
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      {apiResponse && !loading && !error && (
        <List className={styles.dbList}>
          {Object.entries(apiResponse).map(([key, value]) => (
            <>
              <Accordion sx={{ boxShadow: 'none', bgcolor: 'transparent' }} key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${key}-content`}
                  id={`panel-${key}-header`}
                >
                  <ListItem sx={{ py: 0, px: 0, minHeight: 0 }}>
                    <ListItemIcon>
                      <DatabaseIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={key}
                    />
                  </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(144, 202, 249, 0.15)',
                      borderRadius: 1,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {value}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default Databases;
