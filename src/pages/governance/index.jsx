import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Governance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        margin: "20px",
      }}
    >
      <Header
        title="Governance"
        subtitle="The Governance page provides an overview of the activity and progress within the Optimism governance system,
         which is run by votes from the community. It includes data about the number
          and type of proposals that have been submitted, as well as the results of completed proposals.
           It also includes data about the participation and voting behavior of users. This data can give an
            indication of the level of engagement and participation in the governance system, as well as the key
             issues and initiatives being addressed by the community."
      />

      <Box
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography sx={{ color: colors.redAccent[400] }}>
          This page is not done yet :)
        </Typography>
        <Typography sx={{ color: colors.redAccent[400] }}>
          Tune in later to find out more.
        </Typography>
      </Box>
    </Box>
  );
};

export default Governance;
