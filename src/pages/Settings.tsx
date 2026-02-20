import { useState, useEffect, useMemo } from "react";
import type { FC, FormEvent } from "react";
import { Box, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { Save } from "@mui/icons-material";
import packageJson from "../../package.json";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Settings: FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [serverId, setServerId] = useState<string>("");
  const [language, setLanguage] = useState<string>(i18n.language || "pl");
  const { t } = useTranslation();

  const availableLanguages = useMemo(() => {
    return Object.keys(i18n.options.resources || {});
  }, []);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    const storedServerId = localStorage.getItem("serverId");

    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    if (storedServerId) {
      setServerId(storedServerId);
    }
  }, []);

  const handleSave = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("serverId", serverId);
  };

  const handleLanguageChange = (event: SelectChangeEvent): void => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
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
      <Typography variant="h4" component="h1" gutterBottom>
        {t("settings.title")}
      </Typography>
      <Box component="form" onSubmit={handleSave} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t("settings.apiLabel")}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={t("settings.apiPlaceholder")}
          margin="normal"
          variant="outlined"
          type="password"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label={t("settings.serverIdLabel")}
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          placeholder={t("settings.serverIdPlaceholder")}
          margin="normal"
          variant="outlined"
        />
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
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2, mb: 1 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
          >
            {t("settings.save")}
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t("settings.version", { value: packageJson.version })}
      </Typography>
      <a href="https://buycoffee.to/iskrzycki" target="_blank" rel="noopener noreferrer">
        <img src="https://buycoffee.to/static/img/share/share-button-primary.png" style={{ width: 195, height: 51 }} alt="Buy me a coffee on buycoffee.to" />
      </a>
    </Paper>
  );
};

export default Settings;
