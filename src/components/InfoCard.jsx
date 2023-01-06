import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  LaunchOutlined as LaunchOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
} from "@mui/icons-material";
import { tokens } from "../theme";
import { borderRadius } from "@mui/system";

const InfoCard = ({ title, info, source, status, getData, desc }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid
      item
      xs={12}
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        // justifyContent: "center",
        display: "flex",
        padding: "20px",
        paddingTop: "8px",
        flexDirection: "column",
        marginTop: "10px",
        width: "100%",
        alignItems: "start",
        minHeight: "134px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Typography fontSize={"1.2rem"} color={"#dee2e6"}>
          {title}
        </Typography>
        <a
          href={source}
          target="_blank"
          style={{
            textDecoration: "none",
            color: "#dee2e6",
            marginTop: "4px",
          }}
        >
          <LaunchOutlinedIcon
            sx={{ marginLeft: "4px", alignItems: "center", fontSize: "1.2rem" }}
          />
        </a>
      </Box>
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginTop: "18px",
            textAlign: "center",
            color: colors.chartPalette[100],
          }}
        >
          {status === "loaded" ? (
            info
          ) : status === "loading" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "#de291d",
                }}
              >
                Oops! Something went wrong on the server.
              </Typography>
              <IconButton
                onClick={getData}
                sx={{
                  backgroundColor: colors.primary[300],
                  color: colors.grey[100],
                  borderRadius: "8px",
                  fontSize: "1.2rem",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <RefreshOutlinedIcon
                  sx={{
                    marginRight: "4px",
                  }}
                />
                Refresh
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      {desc && (
        <Box
          sx={{
            border: "1px solid #343a40",
            borderRadius: "14px",
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "4px",
            paddingBottom: "4px",
            marginTop: "20px",
            color: "#dee2e6",
          }}
        >
          {desc}
        </Box>
      )}
    </Grid>
  );
};

export default InfoCard;
