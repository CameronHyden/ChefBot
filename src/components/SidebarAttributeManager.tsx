import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Drawer,
  Paper,
  Divider,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { addAllergy } from "../api/api";

type SidebarAttributesManagerProps = {
  allergies?: string[];
  cuisines?: string[];
  onAllergiesChange?: (attributes: string[]) => void;
  onCuisinesChange?: (attributes: string[]) => void;
  onSaveChat?: () => void;
};

export const SidebarAttributesManager = ({
  allergies: initialAllergies = [],
  cuisines: initialCuisines = [],
  onAllergiesChange,
  onCuisinesChange,
  onSaveChat,
}: SidebarAttributesManagerProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allergies, setAllergies] = useState<string[]>(initialAllergies);
  const [cuisines, setCuisines] = useState<string[]>(initialCuisines);
  const [newAllergy, setNewAllergy] = useState("");
  const [newCuisine, setNewCuisine] = useState("");

  // const handleAddAllergy = () => {
  //   if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
  //     const updated = [...allergies, newAllergy.trim()];
  //     setAllergies(updated);
  //     setNewAllergy("");
  //     onAllergiesChange?.(updated);
  //   }
  // };
  const handleAddAllergy = async () => {
  const trimmed = newAllergy.trim();
  if (trimmed && !allergies.includes(trimmed)) {
    try {
      const addedAllergy = await addAllergy(trimmed); // call API
      console.log(addedAllergy);
      setAllergies((prev) => [...prev, trimmed]); // update local state
      setNewAllergy("");
      onAllergiesChange?.([...allergies, trimmed]); // callback if needed
    } catch (err) {
      alert("Failed to add allergy. Check console.");
    }
  }
};

  const handleRemoveAllergy = (allergyToRemove: string) => {
    const updated = allergies.filter((allergy) => allergy !== allergyToRemove);
    setAllergies(updated);
    onAllergiesChange?.(updated);
  };

  const handleAddCuisine = () => {
    if (newCuisine.trim() && !cuisines.includes(newCuisine.trim())) {
      const updated = [...cuisines, newCuisine.trim()];
      setCuisines(updated);
      setNewCuisine("");
      onCuisinesChange?.(updated);
    }
  };

  const handleRemoveCuisine = (cuisineToRemove: string) => {
    const updated = cuisines.filter((cuisine) => cuisine !== cuisineToRemove);
    setCuisines(updated);
    onCuisinesChange?.(updated);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent,
    action: () => void
  ) => {
    if (event.key === "Enter") {
      action();
    }
  };

  return (
    <>
      {/* Settings Button */}
      <IconButton
        onClick={() => setSidebarOpen(true)}
        sx={{
         // position: "fixed",
         // top: 20,
         // left: 20,
          zIndex: 1200,
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "grey.100",
          },
        }}
      >
        <SettingsIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SettingsIcon />
            Preferences
          </Typography>
          <IconButton
            onClick={() => setSidebarOpen(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2, height: "100%", overflow: "auto" }}>
          {/* Allergies Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "medium" }}>
              Allergies & Restrictions
            </Typography>
            
            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              {allergies.map((allergy) => (
                <Paper
                  key={allergy}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    backgroundColor: "error.light",
                    color: "error.contrastText",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{allergy}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveAllergy(allergy)}
                    sx={{ 
                      color: "error.main",
                      "&:hover": { backgroundColor: "error.dark" }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add allergy..."
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddAllergy)}
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleAddAllergy}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Cuisines Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "medium" }}>
              Favorite Cuisines
            </Typography>
            
            <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              {cuisines.map((cuisine) => (
                <Paper
                  key={cuisine}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    backgroundColor: "success.light",
                    color: "success.contrastText",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{cuisine}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveCuisine(cuisine)}
                    sx={{ 
                      color: "success.main",
                      "&:hover": { backgroundColor: "success.dark" }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add cuisine..."
                value={newCuisine}
                onChange={(e) => setNewCuisine(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddCuisine)}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleAddCuisine}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          {/* Save Chat Button */}
          {onSaveChat && (
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSaveChat}
              sx={{
                mt: 'auto',
                py: 1.5,
              }}
            >
              Save Chat
            </Button>
          )}
        </Box>

        {/* Footer with summary */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            backgroundColor: "grey.50",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {allergies.length} allergies • {cuisines.length} favorite cuisines
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};