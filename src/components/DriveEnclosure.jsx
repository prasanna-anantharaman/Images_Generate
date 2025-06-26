import { Box } from "grommet";
import driveSvg from "../assets/drive.svg";
import enclosureSvg from "../assets/enclosure.svg";
import llfdriveSvg from "../assets/lffdrive.svg";
import llfenclosureSvg from "../assets/Lffenclosure.svg";

const DriveEnclosure = ({ filledCount, formFactor = "SFF" }) => {
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
          href={formFactor == "SFF" ? enclosureSvg : llfenclosureSvg}
          width="1900"
          height="300"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Drives */}
        {Array.from({ length: filledCount }).map((_, i) => {
          const row = Math.floor(i / 24);
          const col = i % 24;

          const extraGap = i >= 12 ? 40 : 0;
          const x = 120 + col * 68.5 + extraGap;
          const y = row === 0 ? 15 : 185; // Vertical position based on row

          return (
            <image
              key={i}
              href={formFactor == "SFF" ? driveSvg : llfdriveSvg}
              x={x}
              y={y}
              width={50}
              height={280}
              preserveAspectRatio="none"
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default DriveEnclosure;
