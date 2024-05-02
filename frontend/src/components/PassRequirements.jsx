import { Stack } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PasswordRules from "../data/passwordRules.json";
import Typography from "@mui/material/Typography";

const PassRequirements = ({ strength }) => {
  const getPasswordRule = () => {
    switch (strength) {
      case "medium":
        return PasswordRules.medium.requirements;

      case "strong":
        return PasswordRules.strong.requirements;

      case "very_strong":
        return PasswordRules.very_strong.requirements;

      default:
        console.error("Invalid strength");
        return [];
    }
  };

  const passwordRequirements = getPasswordRule();

  return (
    <>
      <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
        <Stack>
          <Typography sx={{ mt: 2, color: "#9B9B9B" }}>
            {strength} password Requirements:
          </Typography>
          <List>
            {passwordRequirements.map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton sx={{ cursor: "default" }}>
                  <ListItemIcon>
                    <LightbulbIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography sx={{ mt: 2, color: "#9B9B9B" }}>
            Password Tips:
          </Typography>
          <List>
            {PasswordRules.tips.requirements.map((item, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton sx={{ cursor: "default" }}>
                  <ListItemIcon>
                    <LightbulbIcon sx={{ color: "#00B600" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </>
  );
};

export default PassRequirements;
