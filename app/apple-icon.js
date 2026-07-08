import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 95,
          background: '#08090E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '40px',
          border: '6px solid #00F0FF',
          fontWeight: 900,
          position: 'relative',
        }}
      >
        AS
        <div
          style={{
            width: 14,
            height: 14,
            background: '#00F0FF',
            borderRadius: '50%',
            position: 'absolute',
            right: 22,
            bottom: 40,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
