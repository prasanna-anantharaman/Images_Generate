import { Box, Grommet, Heading } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { useState } from "react";
import "./App.css";
import DriveEnclosure from "./components/DriveEnclosure";

const enclosureConfig = {
  SFF: {
    perEnclosure: 24,
  },
  LFF: {
    perEnclosure: 12,
  },
};

function App() {
  // User can set these dynamically
  const [standardCount, setStandardCount] = useState(10);
  const [performanceCount, setPerformanceCount] = useState(14);
  const [archiveCount, setArchiveCount] = useState(12);

  // Calculate total drives for each type
  const totalSffDrives = standardCount + performanceCount;
  const totalLffDrives = archiveCount;

  // Calculate how many enclosures needed
  const sffEnclosureCount = Math.ceil(
    totalSffDrives / enclosureConfig.SFF.perEnclosure
  );
  const lffEnclosureCount = Math.ceil(
    totalLffDrives / enclosureConfig.LFF.perEnclosure
  );

  return (
    <Grommet theme={hpe} full>
      <Box pad="medium" align="center">
        <Heading level="2">Dynamic Drive Enclosure</Heading>
        <Box direction="row" gap="medium" margin={{ bottom: "medium" }}>
          <Box>
            <label>
              Standard Drives:
              <input
                type="number"
                min={0}
                step={1}
                aria-label="Standard Drives"
                value={standardCount}
                onChange={(e) =>
                  setStandardCount(
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
          </Box>
          <Box>
            <label>
              Performance Drives:
              <input
                type="number"
                min={0}
                step={1}
                aria-label="Performance Drives"
                value={performanceCount}
                onChange={(e) =>
                  setPerformanceCount(
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
          </Box>
          <Box>
            <label>
              Archive Drives:
              <input
                type="number"
                min={0}
                step={1}
                aria-label="Archive Drives"
                value={archiveCount}
                onChange={(e) =>
                  setArchiveCount(
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
                style={{ width: 60, marginLeft: 8 }}
              />
            </label>
          </Box>
        </Box>
        <Box alignSelf="center">
          {/* SFF Enclosures */}
          {Array.from({ length: sffEnclosureCount }).map((_, idx) => {
            // Prepare an array representing all SFF drives: 'standard' then 'performance'
            const allSffDrives = [
              ...Array(standardCount).fill("standard"),
              ...Array(performanceCount).fill("performance"),
            ];
            const start = idx * enclosureConfig.SFF.perEnclosure;
            const drivesInThis = allSffDrives.slice(
              start,
              start + enclosureConfig.SFF.perEnclosure
            );
            const enclosureStandard = drivesInThis.filter(
              (d) => d === "standard"
            ).length;
            const enclosurePerformance = drivesInThis.filter(
              (d) => d === "performance"
            ).length;
            return (
              <DriveEnclosure
                key={`sff-${idx}`}
                formFactor="SFF"
                standardCount={enclosureStandard}
                performanceCount={enclosurePerformance}
              />
            );
          })}
          {/* LFF Enclosures */}
          {Array.from({ length: lffEnclosureCount }).map((_, idx) => {
            const start = idx * enclosureConfig.LFF.perEnclosure;
            const drivesInThis = Math.max(
              0,
              Math.min(archiveCount - start, enclosureConfig.LFF.perEnclosure)
            );
            return (
              <DriveEnclosure
                key={`lff-${idx}`}
                formFactor="LFF"
                filledCount={drivesInThis}
              />
            );
          })}
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
