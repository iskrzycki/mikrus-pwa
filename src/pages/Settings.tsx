import { useState, FormEvent, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Save } from "@mui/icons-material";

function Settings(): JSX.Element {
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
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
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Settings;
