import { useState, useMemo } from "react";
import type { FC, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { Add, Edit, Delete, Save } from "@mui/icons-material";
import packageJson from "../../package.json";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useServerStore, type ServerCredentials } from "../store/serverStore";

interface ServerFormData {
  serverId: string;
  apiKey: string;
}

const emptyServerForm: ServerFormData = { serverId: "", apiKey: "" };

const Settings: FC = () => {
  const [language, setLanguage] = useState<string>(i18n.language || "pl");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<ServerCredentials | null>(null);
  const [formData, setFormData] = useState<ServerFormData>(emptyServerForm);
  const { t } = useTranslation();

  const { servers, addServer, updateServer, removeServer } = useServerStore();

  const availableLanguages = useMemo(() => {
    return Object.keys(i18n.options.resources || {});
  }, []);

  const handleLanguageChange = (event: SelectChangeEvent): void => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleOpenAddDialog = () => {
    setEditingServer(null);
    setFormData(emptyServerForm);
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (server: ServerCredentials) => {
    setEditingServer(server);
    setFormData({
      serverId: server.serverId,
      apiKey: server.apiKey,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingServer(null);
    setFormData(emptyServerForm);
  };

  const handleSaveServer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingServer) {
      updateServer(editingServer.id, formData);
    } else {
      addServer(formData);
    }
    handleCloseDialog();
  };

  const handleDeleteServer = (id: string) => {
    removeServer(id);
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
        overflow: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {t("settings.title")}
      </Typography>

      {/* Server Management Section */}
      <Box sx={{ width: "100%", maxWidth: 500, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h6">{t("settings.servers.title")}</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
          >
            {t("settings.servers.add")}
          </Button>
        </Box>
        
        {servers.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            {t("settings.servers.empty")}
          </Typography>
        ) : (
          <List sx={{ bgcolor: "background.default", borderRadius: 1 }}>
            {servers.map((server, index) => (
              <Box key={server.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={server.serverId}
                    secondary={`Key: ${'•'.repeat(8)}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOpenEditDialog(server)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteServer(server.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            ))}
          </List>
        )}
      </Box>

      <Divider sx={{ width: "100%", maxWidth: 500, my: 3 }} />

      {/* Language Settings */}
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="language-select-label">{t("settings.language")}</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            onChange={handleLanguageChange}
            label={t("settings.language")}
          >
            {availableLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {t(`settings.languages.${lang}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, mb: 3 }}>
        {t("settings.version", { value: packageJson.version })}
      </Typography>
      <a href="https://buycoffee.to/iskrzycki" target="_blank" rel="noopener noreferrer">
        <img src="https://buycoffee.to/static/img/share/share-button-primary.png" style={{ width: 195, height: 51 }} alt="Buy me a coffee on buycoffee.to" />
      </a>

      {/* Add/Edit Server Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingServer ? t("settings.servers.editTitle") : t("settings.servers.addTitle")}
        </DialogTitle>
        <Box component="form" onSubmit={handleSaveServer}>
          <DialogContent>
            <TextField
              fullWidth
              label={t("settings.serverIdLabel")}
              value={formData.serverId}
              onChange={(e) => setFormData({ ...formData, serverId: e.target.value })}
              placeholder={t("settings.serverIdPlaceholder")}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label={t("settings.apiLabel")}
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              placeholder={t("settings.apiPlaceholder")}
              margin="normal"
              variant="outlined"
              type="password"
              autoComplete="off"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>{t("settings.servers.cancel")}</Button>
            <Button type="submit" variant="contained" startIcon={<Save />}>
              {t("settings.save")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default Settings;
