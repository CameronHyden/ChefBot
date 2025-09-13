import { ChatForm } from "../components/ChatForm";

import { Box, Typography } from "@mui/material";

export const Home = () => {


  return (
    <>
      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Welcome to ChefBot!
        </Typography>


        <ChatForm />
      </Box>
    </>
  );
};