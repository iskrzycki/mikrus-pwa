import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  type SnackbarCloseReason,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Storage as DatabaseIcon,
  Refresh,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import styles from "./cmd.module.css";
import { boostServer, restartServer } from "../utils";

const CMD: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonAction = async (type: "restart" | "boost") => {
    setOpen(false);
    setLoading(true);
    setError(null);
    setApiResponse(undefined);

    const apiKey = localStorage.getItem("apiKey");
    const serverId = localStorage.getItem("serverId");

    if (!apiKey || !serverId) {
      setError("API key or Server ID not set.");
      setLoading(false);
      return;
    }

    try {
      let response;
      if (type === "restart") {
        response = await restartServer(apiKey, serverId);
      } else if (type === "boost") {
        response = await boostServer(apiKey, serverId);
      }
      if (response && response.error) {
        setError(response.error);
        setOpen(true);
      } else if (response && response.msg) {
        setApiResponse(response.msg);
        setOpen(true);
      }
    } catch (err) {
      setError("Error: " + (err as Error).message);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        {t("cmd.title")}
      </Typography>
      <List className={styles.cmdList}>
        <Accordion sx={{ boxShadow: "none", bgcolor: "transparent" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-cmd-content`}
            id={`panel-cmd-header`}
          >
            <ListItem sx={{ py: 0, px: 0, minHeight: 0 }}>
              <ListItemIcon>
                <DatabaseIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Server Actions" />
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Refresh />}
              onClick={() => handleButtonAction("restart")}
              loading={loading}
            >
              Restart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<Refresh />}
              onClick={() => handleButtonAction("boost")}
              loading={loading}
            >
              Amfetamina
            </Button>
          </AccordionDetails>
        </Accordion>
      </List>
      {!!error || !!apiResponse ? (
        <Snackbar
          open={open && (!!error || !!apiResponse)}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error ? error : apiResponse}
          </Alert>
        </Snackbar>
      ) : null}
    </Paper>
  );
};

export default CMD;
