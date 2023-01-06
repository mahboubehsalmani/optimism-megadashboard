import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { RefreshOutlined as RefreshOutlinedIcon } from "@mui/icons-material";
import { tokens } from "../../theme";
import Logo from "../../assets/img/logo.png";

const CurrentPrice = ({ data, status, getData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        border: `1px solid ${colors.backgroundColor[400]}`,
        borderRadius: "10px",
        backgroundColor: colors.backgroundColor[400],
        boxShadow: `1px 2px ${colors.backgroundColor[900]}`,
        justifyContent: "start",
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src={Logo}
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />
        <Typography
          sx={{
            color: colors.grey[200],
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          OP token
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          Price
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: colors.chartPalette[100],
            }}
          >
            {status === "loaded" ? (
              `$${data.current_price}`
            ) : status === "loading" ? (
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            ) : (
              <IconButton
                onClick={getData}
                sx={{
                  backgroundColor: "none",
                  color: colors.redAccent[500],
                  borderRadius: "8px",
                  fontSize: "1rem",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <RefreshOutlinedIcon
                  sx={{
                    marginRight: "4px",
                  }}
                />
              </IconButton>
            )}
          </Typography>
          <Box>
            {status === "loaded" ? (
              <Typography
                sx={{
                  color:
                    data.price_change_percentage_24h > 0
                      ? "#00cecb"
                      : "#ff5e5b",
                  marginLeft: "4px",
                  fontSize: "1rem",
                }}
              >
                {data.price_change_percentage_24h.toFixed(2)}%
              </Typography>
            ) : status === "loading" ? (
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            ) : (
              <IconButton
                onClick={getData}
                sx={{
                  backgroundColor: "none",
                  color: colors.redAccent[500],
                  borderRadius: "8px",
                  fontSize: "1rem",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <RefreshOutlinedIcon
                  sx={{
                    marginRight: "4px",
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          MarketCap
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2rem",
          }}
        >
          {status === "loaded" ? (
            `$${data.market_cap.toLocaleString("en-US")}`
          ) : status === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData}
              sx={{
                backgroundColor: "none",
                color: colors.redAccent[500],
                borderRadius: "8px",
                fontSize: "1rem",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <RefreshOutlinedIcon
                sx={{
                  marginRight: "4px",
                }}
              />
            </IconButton>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentPrice;
