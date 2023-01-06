import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  HomeOutlined as HomeOutlinedIcon,
  AccountBalanceWalletOutlined as WalletOutlinedIcon,
  ComputerOutlined as DevelopmentOutlinedIcon,
  InventoryOutlined as SupplyOutlinedIcon,
  PaymentsOutlined as TransactionOutlinedIcon,
  InfoOutlined as AboutIcon,
  Gavel as GovernanceIcon,
  Savings as StakingIcon,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../theme";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

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
  const openedMixin = (theme) => ({
    width: drawerWidth,
    backgroundColor: colors.backgroundColor[400],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    backgroundColor: colors.backgroundColor[400],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    backgroundColor: colors.backgroundColor[400],
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
        // sx={{
        //   display: "flex",
        //   justifyContent: open ? "end" : "space-between",
        // }}
        >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <IconButton onClick={() => colorMode.toggleColorMode()}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <SidebarItem
            title={"Home"}
            Icon={<HomeOutlinedIcon />}
            to="/"
            open={open}
            selected={selected}
            setSelected={setSelected}
          />

          <SidebarItem
            title={"Activity"}
            Icon={<TransactionOutlinedIcon />}
            to="/activity"
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
            title={"Staking"}
            Icon={<StakingIcon />}
            to="/staking"
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
        {/* <Divider /> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default Sidebar;
