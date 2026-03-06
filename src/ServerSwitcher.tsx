import type { FC } from "react";
import { FormControl, Select, MenuItem, Box } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useServerStore } from "./store/serverStore";

const ServerSwitcher: FC = () => {
  const { servers, activeServerId, setActiveServer } = useServerStore();

  // Don't show if less than 2 servers
  if (servers.length < 2) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setActiveServer(event.target.value);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 48,
        bgcolor: "#1976d2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 101,
        px: 2,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <Select
          value={activeServerId || ""}
          onChange={handleChange}
          sx={{
            bgcolor: "white",
            "& .MuiSelect-select": {
              py: 0.75,
            },
          }}
        >
          {servers.map((server) => (
            <MenuItem key={server.id} value={server.id}>
              {server.serverId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ServerSwitcher;
