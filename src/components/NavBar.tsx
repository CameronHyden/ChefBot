
import { useState } from "react";
import { AppBar, Toolbar, Button, Box} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SidebarAttributesManager } from "../components/SidebarAttributeManager";

export const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Shellfish']);
  const [cuisines, setCuisines] = useState<string[]>(['Italian', 'Mexican', 'Thai']);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAllergiesChange = (updatedAllergies: string[]) => {
    setAllergies(updatedAllergies);
    console.log("Updated allergies:", updatedAllergies);
  };

  const handleCuisinesChange = (updatedCuisines: string[]) => {
    setCuisines(updatedCuisines);
    console.log("Updated cuisines:", updatedCuisines);
  };

  const handleSaveChat = () => {
    const chatData = {
      allergies,
      cuisines,
      timestamp: new Date().toISOString()
    };
    
    // Create and download JSON file
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chefbot-preferences-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Chat preferences saved:', chatData);
  };

  return (
<AppBar position="static">
  <Toolbar>
    <Box display="flex" gap={2}>
      {!user ? (
        <>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
        </>
      ) : (
        <>
              <SidebarAttributesManager
          allergies={allergies}
          cuisines={cuisines}
          onAllergiesChange={handleAllergiesChange}
          onCuisinesChange={handleCuisinesChange}
          onSaveChat={handleSaveChat}
         // sidebarOpen={sidebarOpen}
        //  onSidebarClose={() => setSidebarOpen(false)}
        />
          <Button component={Link} to="/home" color="inherit">
            Home
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </Box>
  </Toolbar>
</AppBar>

  );
};
