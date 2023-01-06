import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { tokens } from "../theme";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined as SettingsOutlinedIcon,
  LaunchOutlined as LaunchOutlinedIcon,
  CheckOutlined as CheckOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
  WindowOutlined as WindowOutlinedIcon,
} from "@mui/icons-material";

const MyTable = ({
  data,
  columns,
  title,
  subtitle,
  url,
  defaultSize,
  pagination,
  download,
  sort,
  search,
  viewColumns,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tableWidth, setTableWidth] = useState(5.8);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (defaultSize == 100) {
      setTableWidth(11.6);
    } else {
      const width = window.innerWidth;
      width > 1200 ? setTableWidth(5.8) : setTableWidth(11.6);
    }
  }, []);

  const options = {
    filterType: "checkbox",
    selectableRows: false,
    filter: false,
    print: false,
    jumpToPage: false,
    pagination: pagination,
    download: download,
    sort: sort,
    search: search,
    viewColumns: viewColumns,
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: colors.grey[900],
              color: colors.grey[200],
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: colors.backgroundColor[600],
              color: colors.grey[200],
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            root: {
              backgroundColor: colors.backgroundColor[500],
              color: colors.grey[900],
            },
          },
        },
        MuiSvgIcon: {
          styleOverrides: {
            root: {
              color: colors.grey[200],
            },
          },
        },
        MUIDataTableFooter: {
          styleOverrides: {
            root: {
              backgroundColor: colors.backgroundColor[500],
            },
          },
        },
        MUIDataTablePagination: {
          styleOverrides: {
            root: {
              backgroundColor: colors.backgroundColor[500],
              color: "#fff",
            },
          },
        },
      },
    });

  return (
    <Grid
      item
      xs={tableWidth}
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "start",
        display: "flex",

        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          justifyContent: "space-between",
          justifyItems: "baseline",
          display: "flex",
          width: "100%",
          padding: "20px",
        }}
      >
        <Box>
          <Typography color="#dee2e6" fontSize="1.2rem">
            {title}
          </Typography>
          <Typography color={"#ced4da"} fontSize="1rem">
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {url && (
              <MenuItem onClick={handleClose} divider={true}>
                <a
                  href={url}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: colors.grey[100],
                    margin: 0,
                  }}
                >
                  Source Query
                  <LaunchOutlinedIcon sx={{ marginLeft: "10px" }} />
                </a>
              </MenuItem>
            )}
            <MenuItem disabled sx={{ justifyContent: "space-between" }}>
              Chart Width
              <WindowOutlinedIcon />
            </MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setTableWidth(5.8);
                handleClose();
              }}
            >
              50%
              {tableWidth === 5.8 && <CheckOutlinedIcon />}
            </MenuItem>
            <MenuItem
              sx={{
                justifyContent: "space-between",
                justifyItems: "baseline",
                display: "flex",
              }}
              onClick={() => {
                setTableWidth(11.6);
                handleClose();
              }}
            >
              100%
              {tableWidth === 11.6 && <CheckOutlinedIcon />}
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <ThemeProvider theme={getMuiTheme}>
        <MUIDataTable
          title={null}
          data={data}
          columns={columns}
          options={options}
          style={{ width: "100%" }}
        />
      </ThemeProvider>
    </Grid>
  );
};

export default MyTable;
