import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, useTexture, OrbitControls, Stars, Html } from '@react-three/drei';

const SUN_DISTANCE = 22;

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dayOfYearToLabel(doy) {
  let d = doy;
  for (let m = 0; m < 12; m++) {
    if (d < MONTH_DAYS[m]) return `${MONTH_NAMES[m]} ${d + 1}`;
    d -= MONTH_DAYS[m];
  }
  return 'Dec 31';
}

function getCurrentDayOfYear() {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  return Math.floor((now - start) / 86400000);
}

function getCurrentTimeOfDay() {
  const now = new Date();
  return now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
}

function getSunPosition(dayOfYear) {
  // Sun is fixed in world space for a given day — intraday motion is shown by Earth rotating
  const decl = -23.45 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10)) * (Math.PI / 180);
  return [
    0,
    SUN_DISTANCE * Math.sin(decl),
    SUN_DISTANCE * Math.cos(decl),
  ];
}

function Markers({ markers, rotationY }) {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationY;
  }, [rotationY]);

  return (
    <group ref={groupRef}>
      {markers.map((marker, i) => {
        const pos = latLonToVec3(marker.lat, marker.lon, 1.5);
        return (
          <Html key={i} position={pos} occlude>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
            }}>
              <img
                src={marker.image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  // border: '1px solid rgba(255,255,255,0.9)',
                  // boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ width: 2, height: 25, background: 'rgba(255,255,255,0.7)' }} />
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 0 6px rgba(255,255,255,0.9)',
              }} />
            </div>
          </Html>
        );
      })}
    </group>
  );
}

function Sun({ position }) {
  return (
    <>
      <Sphere args={[0.7, 32, 32]} position={position}>
        <meshBasicMaterial color="#fff9c4" />
      </Sphere>
      <Sphere args={[1.0, 32, 32]} position={position}>
        <meshBasicMaterial color="#ffe082" transparent opacity={0.15} />
      </Sphere>
    </>
  );
}

// Matches the texture UV mapping: lon=0 → +X, lon=90E → -Z, lat=90N → +Y
function latLonToVec3(lat, lon, radius) {
  const φ = (lat * Math.PI) / 180;
  const λ = (lon * Math.PI) / 180;
  return [
    radius * Math.cos(φ) * Math.cos(λ),
    radius * Math.sin(φ),
    -radius * Math.cos(φ) * Math.sin(λ),
  ];
}

function Earth({ rotationY }) {
  const meshRef = useRef();
  const texture = useTexture('/textures/earth.jpg');

  useEffect(() => {
    if (meshRef.current) meshRef.current.rotation.y = rotationY;
  }, [rotationY]);

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

export default function GlobeScene({ controls = true, markers = [] }) {
  const [timeOfDay, setTimeOfDay] = useState(() => getCurrentTimeOfDay());
  const [dayOfYear, setDayOfYear] = useState(() => getCurrentDayOfYear());
  const [isLive, setIsLive] = useState(true);
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < 600);

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => {
      setTimeOfDay(getCurrentTimeOfDay());
      setDayOfYear(getCurrentDayOfYear());
    }, 1000);
    return () => clearInterval(id);
  }, [isLive]);

  const sunPos = useMemo(() => getSunPosition(dayOfYear), [dayOfYear]);
  // Three.js SphereGeometry maps U=0.5 (prime meridian) to the +X axis at rotationY=0,
  // so subtract π/2 to align noon (PM facing +Z sun) correctly.
  const rotationY = useMemo(() => ((timeOfDay - 12) / 24) * Math.PI * 2 - Math.PI / 2, [timeOfDay]);

  const timeLabel = useMemo(() => {
    const h = Math.floor(timeOfDay % 24);
    const m = Math.floor((timeOfDay % 1) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} UTC`;
  }, [timeOfDay]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ background: '#000011' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={sunPos} intensity={12.0} color="#fff9e0" />
        <Earth rotationY={rotationY} />
        <Sun position={sunPos} />
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
        {markers.length > 0 && <Markers markers={markers} rotationY={rotationY} />}
        <OrbitControls enablePan={false} enableZoom minDistance={2.5} maxDistance={10} />
      </Canvas>

      {controls && <div style={{
        position: 'absolute',
        ...(narrow
          ? { bottom: 16, left: '50%', transform: 'translateX(-50%)', flexDirection: 'row', gap: 24, width: 'max-content', maxWidth: 'calc(100vw - 32px)' }
          : { top: 16, left: 16, flexDirection: 'column', gap: 14, width: 200 }
        ),
        background: 'rgba(200,210,230,0.18)',
        backdropFilter: 'blur(10px)',
        borderRadius: 12,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        color: '#e8eaf6',
        fontFamily: 'monospace',
        fontSize: 13,
        userSelect: 'none',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* <span>Time</span> */}
            <span style={{ color: '#90caf9' }}>{timeLabel}</span>
          </div>
          <input
            type="range"
            min={0}
            max={24}
            step={0.05}
            value={timeOfDay}
            onChange={e => { setIsLive(false); setTimeOfDay(parseFloat(e.target.value)); }}
            style={{ width: '100%', accentColor: '#90caf9', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* <span>Day</span> */}
            <span style={{ color: '#a5d6a7' }}>{dayOfYearToLabel(dayOfYear)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={364}
            step={1}
            value={dayOfYear}
            onChange={e => { setIsLive(false); setDayOfYear(parseInt(e.target.value)); }}
            style={{ width: '100%', accentColor: '#a5d6a7', cursor: 'pointer' }}
          />
        </div>

        <button
          onClick={() => setIsLive(true)}
          disabled={isLive}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            border: isLive ? '1px solid #ef5350' : '1px solid #555',
            background: isLive ? 'rgba(239,83,80,0.15)' : 'transparent',
            color: isLive ? '#ef5350' : '#888',
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: '0.08em',
            cursor: isLive ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.2s',
            width: narrow ? 'auto' : '100%',
            flexShrink: 0,
          }}
        >
          <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: isLive ? '#ef5350' : '#555',
            boxShadow: isLive ? '0 0 6px #ef5350' : 'none',
            display: 'inline-block',
            flexShrink: 0,
          }} />
          LIVE
        </button>
      </div>}
    </div>
  );
}
