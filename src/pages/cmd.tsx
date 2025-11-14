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
  RocketLaunch as BoostIcon,
} from "@mui/icons-material";
import styles from "./cmd.module.css";
import { boostServer, execCmd, restartServer, getApiErrorMessage } from "../utils";

const CMD: FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cmdInput, setCmdInput] = useState("");
  const [cmdResponse, setCmdResponse] = useState("");

  const handleSendCmd = async () => {
    setLoading(true);
    setError(null);
    setCmdResponse("");

    const apiKey = localStorage.getItem("apiKey");
    const serverId = localStorage.getItem("serverId");

    if (!cmdInput.trim()) {
      setCmdResponse(t("cmd.cmd.pleaseEnterCommand"));
      setLoading(false);
      return;
    }
    if (!apiKey || !serverId) {
      setError(t("cmd.errors.apiOrServerIdMissing"));
      setLoading(false);
      return;
    }

    try {
      const response = await execCmd(apiKey, serverId, cmdInput);
      setCmdResponse(response.output || t("cmd.cmd.noOutput"));
    } catch (err) {
      setCmdResponse(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleButtonAction = async (type: "restart" | "boost") => {
    setOpen(false);
    setLoading(true);
    setError(null);
    setApiResponse(undefined);

    const apiKey = localStorage.getItem("apiKey");
    const serverId = localStorage.getItem("serverId");

    if (!apiKey || !serverId) {
      setError(t("cmd.errors.apiOrServerIdMissing"));
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
      setError(getApiErrorMessage(err));
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Paper elevation={3} className={styles.cmdContainer}>
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
              <ListItemText primary={t("cmd.actions.title")} />
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
              sx={{ marginRight: 4 }}
            >
              {t("cmd.actions.restart")}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<BoostIcon />}
              onClick={() => handleButtonAction("boost")}
              loading={loading}
            >
               {t("cmd.actions.boost")}
            </Button>
          </AccordionDetails>
        </Accordion>
      </List>
      <textarea
        value={cmdInput}
        onChange={(e) => setCmdInput(e.target.value)}
        placeholder={t("cmd.cmd.placeholder")}
        rows={4}
        className={styles.cmdTextarea}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendCmd}
        sx={{ mb: 2 }}
        loading={loading}
      >
        {t("cmd.cmd.execute")}
      </Button>
      {!!cmdResponse && (
        <>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            {t("cmd.cmd.response")}
          </Typography>
          <Paper variant="outlined" className={styles.cmdResponsePaper}>
            {cmdResponse}
          </Paper>
        </>
      )}
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
