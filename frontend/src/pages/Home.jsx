import { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import PassRequirements from "../components/PassRequirements";
import CustomButton from "../components/CustomButton";
import FeedbackDialog from "../components/FeedbackDialog";
import AdminDialog from "../components/AdminDialog";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

const Home = () => {
  const [feedbackopen, setFeedbackOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [progressColor, setProgressColor] = useState("#FF0000");
  const [strictnessLevel, setStrictnessLevel] = useState("medium");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [isParametersSet, setIsParametersSet] = useState(false);
  const [wordListArray, setWordListArray] = useState([]);
  const [strength, setStrength] = useState("weak");

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const fetchEnglishWordList = async () => {
    try {
      const response = await fetch("http://localhost:4000/wordlist");
      if (response.ok) {
        const wordListData = await response.json();
        setWordListArray(wordListData.wordList);
        console.log(wordListArray);
      } else {
        console.error(
          "Failed to fetch English word list:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during English word list fetching:", error);
    }
  };

  const checkPasswordStrength = (inputPassword) => {
    if (
      strictnessLevel === "very_strong" &&
      wordListArray.includes(inputPassword.toLowerCase())
    ) {
      console.log(inputPassword.toLowerCase);
      setStrength("weak");
      setFeedback(["Password cannot be based on words found in the word list"]);
      setProgressColor("#FF0000"); // Red
      return;
    }
    // Minimum length check
    if (inputPassword.length < 12) {
      setStrength("weak");
      setFeedback(["Password must be at least 12 characters long"]);
      setProgressColor("#FF0000"); // Red
      return;
    }

    // Check if the password matches the first name, last name, or email
    if (
      inputPassword.toLowerCase() === firstName.toLowerCase() ||
      inputPassword.toLowerCase() === lastName.toLowerCase() ||
      inputPassword.toLowerCase() === email.toLowerCase()
    ) {
      setStrength("weak");
      setFeedback([
        "Password cannot match the first name, last name, or email",
      ]);
      setProgressColor("#FF0000"); // Red
      return;
    }

    // Character types check
    const hasUpperCase = /[A-Z]/.test(inputPassword);
    const hasLowerCase = /[a-z]/.test(inputPassword);
    const hasNumberOrPunctuation = /[0-9!@#$%^&*(),.?":{}|<>]/.test(
      inputPassword
    );
    const hasNoSpaces = !/\s/.test(inputPassword);

    if (
      !(hasUpperCase && hasLowerCase && hasNumberOrPunctuation && hasNoSpaces)
    ) {
      setStrength("medium");
      setFeedback([
        "Password must have at least 1 capital letter, 1 lower case letter, and 1 number or punctuation",
        "Password cannot contain spaces",
      ]);
      setProgressColor("#FFFF00"); // Yellow
      return;
    }

    // Dictionary check
    const dictionary = [
      "example",
      "password",
      "123456",
      "qwerty",
      "pneumonoultramicroscopicsilicovolcanoconiosis",
    ];

    // Word List check
    if (dictionary.includes(inputPassword.toLowerCase())) {
      setStrength("medium");
      setFeedback(["Password cannot be based on words found in a dictionary"]);
      setProgressColor("#FFFF00"); // Yellow
      return;
    }

    // Repeating patterns check
    const repeatingPatternRegex = /(.)\1{2,}/;
    if (repeatingPatternRegex.test(inputPassword)) {
      setStrength("medium");
      setFeedback(["Password cannot be based on simple repeating patterns"]);
      setProgressColor("#FFFF00"); // Yellow
      return;
    }

    // If all checks passed, the password is strong
    setStrength("strong");
    setFeedback(["Password is strong"]);
    setProgressColor("#00FF00"); // Green
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSetParameters = () => {
    if (firstName && lastName && email) {
      setIsPasswordInputActive(true);
      setIsParametersSet(true);
    } else {
      setIsPasswordInputActive(false);
    }
  };

  useEffect(() => {
    const fetchStrictnessLevel = async () => {
      try {
        const response = await fetch("http://localhost:4000/strictness");
        if (response.ok) {
          const strictnessData = await response.json();

          setStrictnessLevel(strictnessData.strictness.level);
          if (
            strictnessLevel === "strong" ||
            strictnessLevel === "very_strong"
          ) {
            setShowForm(true);

            if (strictnessLevel === "very_strong") {
              // Fetch English word list
              fetchEnglishWordList();
            }
          }
        } else {
          console.error(
            "Failed to fetch strictness level:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during strictness level fetching:", error);
      }
    };

    fetchStrictnessLevel();
  }, [strictnessLevel]);

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  const handleFeedbackClick = () => {
    setFeedbackOpen(!feedbackopen);
  };

  const handleAdminClose = () => {
    setAdminOpen(false);
  };

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  return (
    <>
      <Toolbar />
      <Toolbar />
      <Toolbar />
      <Stack sx={{ mx: { xs: 0, md: 30 } }}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            mt: { xs: 3, md: 2 },
            fontSize: { xs: 24, md: 35 },
          }}>
          Password Analysis Tool
        </Typography>
        <Divider />
        <Typography sx={{ my: 2, color: "#00B600" }}>
          This Password Strength Analysis Tool runs on your local machine
          browser and does not store or share your password.
        </Typography>
        {showForm && (
          <Stack direction="column">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-first-name">
                    First Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-first-name"
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    label="First Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-last-name">
                    Last Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-last-name"
                    type="text"
                    value={lastName}
                    onChange={handleLastNameChange}
                    label="Last Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ my: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetParameters}
                sx={{ mt: 2 }}>
                SET PARAMETERS
              </Button>
            </Stack>

            <Typography
              variant="body2"
              sx={{ mt: 2, color: isParametersSet ? "green" : "red" }}>
              {isParametersSet
                ? "Parameters set, you may change them any time. Input your password below to analyze strength."
                : `Strictness level is set to ${strictnessLevel} by the admin. You MUST set the above parameters to continue.`}
            </Typography>
          </Stack>
        )}

        <Stack sx={{ mt: 5 }}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              disabled={!isPasswordInputActive && showForm}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Stack>
        <Stack sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ pb: 2, fontWeight: "bold" }}>
            Password Strength: {strength}
          </Typography>
          {feedback.map((item, index) => (
            <Typography key={index} variant="body2">
              - {item}
            </Typography>
          ))}
          <LinearProgress
            variant="determinate"
            value={strength === "weak" ? 0 : strength === "medium" ? 0 : 0}
            sx={{
              backgroundColor: "#E0E0E0",
              height: 20,
              borderRadius: 5,
              mt: 2,
            }}
            style={{ backgroundColor: progressColor }}
          />
        </Stack>

        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          The password Strength is set to {strictnessLevel} by the admin
        </Typography>

        <PassRequirements strength={strictnessLevel} />
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, mb: 10, mx: { xs: 0, md: 30 } }}>
        <CustomButton text={"Submit feedback"} onClick={handleFeedbackClick} />
        <CustomButton text={"Admin login"} onClick={handleAdminClick} />
      </Stack>
      <FeedbackDialog open={feedbackopen} handleClose={handleFeedbackClose} />
      <AdminDialog open={adminOpen} handleClose={handleAdminClose} />
    </>
  );
};

export default Home;
