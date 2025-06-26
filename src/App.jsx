import { Box, Button, Grommet, Heading, RadioButtonGroup } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { useState } from "react";
import "./App.css";
import DriveEnclosure from "./components/DriveEnclosure"; // Import the DriveEnclosure component

function App() {
  const [filledCount, setFilledCount] = useState(24); // State to track the number of filled slots
  const totalSlots = 24; // Total number of slots in the enclosure
  const [formFactor, setFormFactor] = useState("SFF"); // State to track the form factor

  return (
    <Grommet theme={hpe} full>
      <Box pad="medium" align="center">
        <Heading level="2">Dynamic Drive Enclosure</Heading>
        <Box direction="row" gap="medium" margin={{ bottom: "medium" }}>
          <Button
            label={`Add Drive (Filled: ${filledCount}/${totalSlots})`}
            onClick={() =>
              setFilledCount((count) => Math.min(count + 1, totalSlots))
            }
            primary
          />
          <Button
            label="Remove Drive"
            onClick={() => setFilledCount((count) => Math.max(count - 1, 0))}
            secondary
          />
        </Box>
        <Box
          direction="row"
          gap="medium"
          margin={{ bottom: "medium" }}
          align="center"
        >
          <RadioButtonGroup
            name="formFactor"
            options={[
              { label: "SFF (Small Form Factor)", value: "SFF" },
              { label: "LFF (Large Form Factor)", value: "LFF" },
            ]}
            value={formFactor}
            onChange={(event) => setFormFactor(event.target.value)}
            direction="row"
          />
        </Box>
        <Box alignSelf="center">
          <DriveEnclosure
            totalSlots={totalSlots}
            filledCount={filledCount}
            formFactor={formFactor}
          />
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
