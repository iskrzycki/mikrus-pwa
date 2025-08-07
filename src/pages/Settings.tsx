import { useState, useEffect } from "react";
import type { FC, FormEvent } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Save } from "@mui/icons-material";
import packageJson from "../../package.json";

const Settings: FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [serverId, setServerId] = useState<string>("");

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
    alert("Settings saved!");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "90vw",
        height: "calc(100vh - 120px)",
        mt: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Box component="form" onSubmit={handleSave} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          margin="normal"
          variant="outlined"
          type="password"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Server ID"
          value={serverId}
          onChange={(e) => setServerId(e.target.value)}
          placeholder="Enter your server ID"
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<Save />}
          sx={{ mt: 2, mb: 1 }}
        >
          Save Settings
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        App Version: {packageJson.version}
      </Typography>
    </Paper>
  );
};

export default Settings;
