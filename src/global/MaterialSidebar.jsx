import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
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
import { ColorModeContext, tokens } from "../theme";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const drawerWidth = 240;

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let path = location.pathname.replace("/", "");
    if (path === "") setSelected("home");
    else setSelected(path);
  }, []);

  const [mobileViewOpen, setMobileViewOpen] = useState(false);

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const responsiveDrawer = (
    <div
      style={{ backgroundColor: colors.backgroundColor[600], height: "100%" }}
    >
      <Toolbar />
      <Divider />
      <List sx={{ backgroundColor: colors.backgroundColor[600] }}>
        <SidebarItem
          title={"Home"}
          Icon={<HomeOutlinedIcon />}
          to="/"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"Transactions"}
          Icon={<TransactionOutlinedIcon />}
          to="/transactions"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title={"Fees"}
          Icon={<FeeIcon />}
          to="/fees"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"Blocks"}
          Icon={<BlocksIcon />}
          to="/blocks"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"Wallets"}
          Icon={<WalletOutlinedIcon />}
          to="/wallets"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"Developments"}
          Icon={<DevelopmentOutlinedIcon />}
          to="/developments"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"DeFi"}
          Icon={<DeFiIcon />}
          to="/defi"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title={"Supply"}
          Icon={<SupplyOutlinedIcon />}
          to="/supply"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"NFT"}
          Icon={<NFTIcon />}
          to="/nft"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title={"Governance"}
          Icon={<GovernanceIcon />}
          to="/governance"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />

        <SidebarItem
          title={"About"}
          Icon={<AboutIcon />}
          to="/about"
          open={open}
          selected={selected}
          setSelected={setSelected}
        />
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: colors.backgroundColor[600],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileViewOpen}
          onClose={handleToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {responsiveDrawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {responsiveDrawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
