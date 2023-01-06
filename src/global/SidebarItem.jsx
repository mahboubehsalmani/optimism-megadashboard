import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

const SidebarItem = ({ title, to, Icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItemButton
      sx={{
        color: colors.grey[100],
        background:
          selected.toLowerCase() === title.toLowerCase()
            ? colors.primary[300]
            : "inherit",
      }}
      onClick={() => setSelected(title)}
      component={Link}
      to={to}
    >
      <ListItemIcon sx={{ color: colors.grey[100] }}>{Icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default SidebarItem;
