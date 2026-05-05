// components/WaveDivider.tsx
export default function WaveDividerUp() {
  return (
    <div className="w-full overflow-hidden leading-none -mb-px">
      <svg
        viewBox="0 0 1920 107"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block h-16 md:h-24"
        fill="none"
      >
        <path
          d="M1920 67.8202V68.5196L1919.92 106.653H0V96.9167C62.8006 81.4592 127.653 67.7922 193.574 55.9718C527.522 -3.96992 889.103 -16.9095 1152.15 22.6926C1234.58 35.1006 1315.54 48.0681 1402.22 58.9933C1550.91 77.7382 1713.13 89.6566 1919.92 67.8202C1919.94 67.8202 1919.97 67.8202 1920 67.8202Z"
          fill="#F8E3E2"
        />
      </svg>
    </div>
  );
}

export  function WaveDividerDown() {
  return (
    <div className="w-full overflow-hidden leading-none -mb-px">
      <svg
        viewBox="0 0 1920 145"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block h-16 md:h-24 lg:h-[145px]"
        fill="none"
      >
        <g clipPath="url(#wave-clip)">
          <path
            d="M1920 106.168V106.867L1919.92 145.001H0V135.264C62.8006 119.807 127.653 106.14 193.574 94.3194C527.522 34.3777 889.103 21.4382 1152.15 61.0402C1234.58 73.4482 1315.54 86.4158 1402.22 97.341C1550.91 116.086 1713.13 128.004 1919.92 106.168C1919.94 106.168 1919.97 106.168 1920 106.168Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="wave-clip">
            <rect width="1920" height="145" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
 