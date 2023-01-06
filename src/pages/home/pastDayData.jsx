import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { RefreshOutlined as RefreshOutlinedIcon } from "@mui/icons-material";
import { tokens } from "../../theme";

const PastDayData = ({ data, status, getData }) => {
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
        <Typography
          sx={{
            color: colors.grey[200],
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          Past 24 hours
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
            fontSize: "1rem",
          }}
        >
          New users
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
              fontSize: "1rem",
            }}
          >
            {status.statusNewUsers === "loaded" ? (
              `${data.dataNewUsers.toLocaleString("en-US")}`
            ) : status.statusNewUsers === "loading" ? (
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            ) : (
              <IconButton
                onClick={getData.getNewUsers}
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
            fontSize: "1rem",
          }}
        >
          Active users
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
              fontSize: "1rem",
            }}
          >
            {status.statusActiveUsers === "loaded" ? (
              `${data.dataActiveUsers.toLocaleString("en-US")}`
            ) : status.statusActiveUsers === "loading" ? (
              <CircularProgress
                sx={{
                  color: colors.secondary[400],
                }}
              />
            ) : (
              <IconButton
                onClick={getData.getActiveUsers}
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
            fontSize: "1rem",
          }}
        >
          Transactions
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusTransactions === "loaded" ? (
            `${data.dataTransactions.toLocaleString("en-US")}`
          ) : status.statusTransactions === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getTransactions}
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
            fontSize: "1rem",
          }}
        >
          Average TPS
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusAverageTPS === "loaded" ? (
            `${data.dataAverageTPS.toLocaleString("en-US")}`
          ) : status.statusAverageTPS === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getAverageTPS}
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
            fontSize: "1rem",
          }}
        >
          Blocks
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusBlocks === "loaded" ? (
            `${data.dataBlocks.toLocaleString("en-US")}`
          ) : status.statusBlocks === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getPastDayBlocks}
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
            fontSize: "1rem",
          }}
        >
          Total fee
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusTotalFee === "loaded" ? (
            `${data.dataTotalFee.toLocaleString("en-US")}`
          ) : status.statusTotalFee === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getPastDayTotalFee}
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
            fontSize: "1rem",
          }}
        >
          Average gas price
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusGasPrice === "loaded" ? (
            `${data.dataGasPrice.toLocaleString("en-US")}`
          ) : status.statusGasPrice === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getPastDayGasPrice}
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
            fontSize: "1rem",
          }}
        >
          Transaction success rate
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {status.statusTxSuccessRate === "loaded" ? (
            `${data.dataTxSuccessRate.toLocaleString("en-US")}`
          ) : status.statusTxSuccessRate === "loading" ? (
            <CircularProgress
              sx={{
                color: colors.secondary[400],
              }}
            />
          ) : (
            <IconButton
              onClick={getData.getPastDayTxSuccessRate}
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

export default PastDayData;
