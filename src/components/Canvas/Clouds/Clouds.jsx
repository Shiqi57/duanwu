import { OrbitControls, Sky, Stars, Cloud } from '@react-three/drei';

const Clouds = (props) => {

  return (
    <group
      {...props}
      dispose={null}
    >
      {Array.from({ length : 20 }).map((_, i) => (
        <Cloud
          key={i}
          opacity={0.5}
          speed={0.2} // Rotation speed
          width={Math.random() * 10 + 5} // Width of the full cloud
          depth={1.5} // Z-dir depth
          segments={20} // Number of particles
          position={[Math.random() * 150 - 75, Math.random() * 40 + 10, -80]}
        />
      ))}
    </group>
  );
};

export default Clouds;
