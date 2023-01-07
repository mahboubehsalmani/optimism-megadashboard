import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import {
  AccountBalanceWalletOutlined as WalletOutlinedIcon,
  ComputerOutlined as DevelopmentOutlinedIcon,
  ReceiptLongOutlined as TransactionOutlinedIcon,
  PaidOutlined as FeeIcon,
  HomeOutlined as HomeOutlinedIcon,
  ViewWeekOutlined as BlocksIcon,
  CurrencyExchangeOutlined as DeFiIcon,
  AccountBalanceOutlined as SupplyOutlinedIcon,
  PaletteOutlined as NFTIcon,
  InfoOutlined as AboutIcon,
  Gavel as GovernanceIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const QuickAccess = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid container gap={2}>
      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#6699cc",
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
        to="/transactions"
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Transaction
        </Typography>
        <TransactionOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#7f2982",
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
        to="/fees"
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Fees
        </Typography>
        <FeeIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#ff8c42",
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
        to="/blocks"
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Blocks
        </Typography>
        <BlocksIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>
      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#ff3c38",
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
            fontSize: "1.2rem",
          }}
        >
          Wallet
        </Typography>
        <WalletOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>

      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#83b692",
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
            fontSize: "1.2rem",
          }}
        >
          Development
        </Typography>
        <DevelopmentOutlinedIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>

      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#f9627d",
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
        to="/defi"
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          DeFi
        </Typography>
        <DeFiIcon
          sx={{
            marginRight: "8px",
            fontSize: "2rem",
          }}
        />
      </Grid>

      <Grid
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#1f7a8c",
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
            fontSize: "1.2rem",
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
        lg={2.8}
        md={5.8}
        xs={12}
        item
        sx={{
          border: `1px solid ${colors.backgroundColor[400]}`,
          borderRadius: "10px",
          backgroundColor: "#de639a",
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
        to="/nft"
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          NFT
        </Typography>
        <NFTIcon
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
