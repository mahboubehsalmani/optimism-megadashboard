import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

const SidebarItem = ({ title, to, Icon, open, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItem
      key={title}
      disablePadding
      sx={{
        background:
          selected.toLowerCase() === title.toLowerCase()
            ? colors.primary[300]
            : "transparent !important",
      }}
    >
      <ListItemButton
        onClick={() => setSelected(title)}
        component={Link}
        to={to}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
        LinkComponent={<Link to={to} />}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {Icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
