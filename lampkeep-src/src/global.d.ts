interface LampkeepApi {
  screen: string;
  player: { x: number; y: number; z: number; yaw: number };
  fps: number;
  stage: (name: "stones" | "journal" | "gatewick") => void;
  teleport: (x: number, y: number, z: number) => void;
  hold: (value: boolean) => void;
}

interface Window {
  __LAMPKEEP?: LampkeepApi;
}
