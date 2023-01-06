import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import {
  GroupAdd as NewUserIcon,
  Person as ActiveUserIcon,
  AccountBalanceWallet as ActivityIcon,
  SixtyFpsSelect as TPSIcon,
  Gavel as GovernanceIcon,
  Savings as StakingIcon,
  AccountBalanceWalletOutlined as WalletOutlinedIcon,
  ComputerOutlined as DevelopmentOutlinedIcon,
  InventoryOutlined as SupplyOutlinedIcon,
  PaymentsOutlined as TransactionOutlinedIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const QuickAccess = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid container gap={2}>
      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[700],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/activity"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Activity
        </Typography>
        <TransactionOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[800],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/wallets"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Wallets
        </Typography>
        <WalletOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[900],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/developments"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Developments
        </Typography>
        <DevelopmentOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[200],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/staking"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Staking
        </Typography>
        <StakingIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>

      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[500],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/supply"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Supply
        </Typography>
        <SupplyOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>

      <Grid
        xs={3.8}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: colors.chartPalette[600],
          boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
          justifyContent: "space-between",
          display: "flex",
          padding: "20px",
          flexDirection: "row",
          marginTop: "10px",
          textDecoration: "none",
          color: colors.grey[300],
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
        component={Link}
        to="/governance"
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
          }}
        >
          Governance
        </Typography>
        <GovernanceIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default QuickAccess;
