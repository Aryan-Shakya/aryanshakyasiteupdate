import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 270,
          background: '#08090E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '110px',
          border: '18px solid #00F0FF',
          fontWeight: 900,
          position: 'relative',
        }}
      >
        AS
        <div
          style={{
            width: 42,
            height: 42,
            background: '#00F0FF',
            borderRadius: '50%',
            position: 'absolute',
            right: 68,
            bottom: 115,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
