import { Box } from "grommet";
import llfdriveSvg from "../assets/Lff_drive.svg";
import llfenclosureSvg from "../assets/Lff_Enclosure.svg";
import enclosureSvg from "../assets/SFF_Enclosure.svg";
import performanceDriveSvg from "../assets/SFF_Performance_drive.svg";
import standardDriveSvg from "../assets/SFF_Standard_drive.svg";

// Accept standardCount and performanceCount for SFF, filledCount for LFF
const DriveEnclosure = ({
  filledCount,
  standardCount = 0,
  performanceCount = 0,
  formFactor = "SFF",
}) => {
  // For SFF, build an array of drive types
  let drives = [];
  if (formFactor === "SFF") {
    drives = [
      ...Array(standardCount).fill("standard"),
      ...Array(performanceCount).fill("performance"),
    ];
  } else {
    drives = Array.from({ length: filledCount }).fill("lff");
  }

  return (
    <Box
      style={{
        width: "100%",
        maxWidth: "1900px",
      }}
      round="xsmall"
      elevation="medium"
    >
      {/* Everything inside a single SVG for perfect scaling */}
      <svg
        viewBox="0 0 1900 300"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        {/* Background enclosure */}
        <image
          href={formFactor === "SFF" ? enclosureSvg : llfenclosureSvg}
          width="1900"
          height="300"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Drives */}
        {drives.map((type, i) => {
          let row, col, x, y, width, height, href;

          if (formFactor === "SFF") {
            // 1 row, 24 columns
            // Add extra gap after 12th drive for visual separation
            const extraGap = i >= 12 ? 40 : 0;
            row = 0;
            col = i % 24;
            x = 120 + col * 68.5 + extraGap;
            y = row === 0 ? 15 : 185;
            width = 50;
            height = 270;
            href = type === "standard" ? standardDriveSvg : performanceDriveSvg;
          } else {
            // 3 rows, 4 columns for LFF
            row = Math.floor(i / 4);
            col = i % 4;
            x = 120 + col * 420.5;
            y = 15 + row * 100;
            width = 400;
            height = 80;
            href = llfdriveSvg;
          }

          return (
            <image
              key={i}
              href={href}
              x={x}
              y={y}
              width={width}
              height={height}
              preserveAspectRatio="none"
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default DriveEnclosure;
