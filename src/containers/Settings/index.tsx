import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Card from "../../components/Card";
import HomeIcon from "@mui/icons-material/Home";
import Container from "../../components/Container";
import { useSettings } from "../../providers/SettingsProvider";

const Settings = () => {
  const { settings, setSettings } = useSettings();
  return (
    <>
      <AppBar
        leftComponent={
          <Link component={RouterLink} to="/">
            <HomeIcon sx={{ color: "#fff", fontSize: 25 }} />
          </Link>
        }
        centerComponent={
          <Typography
            variant="h6"
            component="div"
            sx={{ whiteSpace: "nowrap" }}
          >
            Inställningar
          </Typography>
        }
      />
      <Container styles={{ padding: 16 }}>
        <Card>
          <Stack sx={{ width: "100%" }}>
            <div style={{ padding: 16 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settings.hideTime}
                      onChange={() =>
                        setSettings({ hideTime: !settings.hideTime })
                      }
                    />
                  }
                  label="Göm klockan"
                />
              </FormGroup>
            </div>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default Settings;
