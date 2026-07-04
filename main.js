(function() {
  // ================= GEO DATA =================
  const RAW_OUTLINE = [ /* ... pura RAW_OUTLINE paste kar do ... */ ];
  const RIVER_GANGA = [ /* ... pura RIVER_GANGA ... */ ];
  const RIVER_YAMUNA = [ /* ... pura RIVER_YAMUNA ... */ ];
  const RAW_SEEDS = [ /* ... pura RAW_SEEDS ... */ ];

  const HOME_NAME = "Lucknow";

  // POIs aur LANDMARK same rakh sakte ho (pura code copy kar lena)

  // ================= PROJECTION FUNCTIONS =================
  const PAD_KM = 12;
  let lonMin=Infinity, lonMax=-Infinity, latMin=Infinity, latMax=-Infinity;
  // ... (pura projection code same)

  function proj(lat,lon){ /* ... */ }
  const WORLD_W = /* ... */;
  const WORLD_H = /* ... */;
  const OUTLINE = RAW_OUTLINE.map(p=>proj(p[0],p[1]));
  const GANGA = RIVER_GANGA.map(p=>proj(p[0],p[1]));
  const YAMUNA = RIVER_YAMUNA.map(p=>proj(p[0],p[1]));

  function pointInPolygon(x,y,poly){ /* ... */ }
  function terrainNoise(x,z){ /* ... */ }
  function terrainHeight(x,z){ /* ... */ }

  // ... ZONES, goldenColor, nearestZone etc. same

  // ================= THREE.JS SETUP =================
  const canvas = document.getElementById('canvas3d');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fd1ff);
  scene.fog = new THREE.FogExp2(0xaee2ff, 0.0009);

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth/window.innerHeight, 1, 6000);

  // Lights
  const sun = new THREE.DirectionalLight(0xfff2d6, 1.1);
  sun.position.set(400,600,200);
  sun.castShadow = true;
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0x8899cc, 0.65));
  scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x33422a, 0.5));

  // Resize handler
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Terrain, Rivers, Roads (pura code yahan paste kar do)

  // ================= DENSE BUILDINGS =================
  const buildingGroup = new THREE.Group();
  scene.add(buildingGroup);

  function box(w, h, d, color, rough = 0.8) {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: rough })
    );
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  function createSimpleBuilding() {
    const g = new THREE.Group();
    const w = 3.5 + Math.random() * 4.5;
    const d = 3.5 + Math.random() * 4.5;
    const h = 4 + Math.random() * 8;

    const base = box(w, h, d, 0x8a8a9e + Math.random() * 0x222222);
    base.position.y = h / 2;
    g.add(base);

    const roof = box(w * 1.05, 1, d * 1.05, 0x444455);
    roof.position.y = h + 0.5;
    g.add(roof);

    return g;
  }

  function placeDenseBuildings(count = 420) {
    for (let i = 0; i < count; i++) {
      const x = Math.random() * WORLD_W;
      const z = Math.random() * WORLD_H;

      if (!pointInPolygon(x, z, OUTLINE)) continue;
      const height = terrainHeight(x, z);
      if (height <= -5) continue;

      // Near road check
      let nearRoad = false;
      for (let dx = -18; dx <= 18; dx += 7) {
        for (let dz = -18; dz <= 18; dz += 7) {
          if (Math.abs(terrainHeight(x + dx, z + dz) - height) > 1.6) {
            nearRoad = true;
            break;
          }
        }
        if (nearRoad) break;
      }

      if (Math.random() > (nearRoad ? 0.68 : 0.22)) continue;

      // Avoid major POI areas
      let tooClose = false;
      for (let zone of ZONES) {
        if (Math.hypot(zone.x - x, zone.z - z) < 42) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      const building = createSimpleBuilding();
      building.position.set(x, height, z);
      building.rotation.y = Math.random() * Math.PI * 2;
      building.scale.setScalar(0.75 + Math.random() * 0.8);

      buildingGroup.add(building);
    }
  }

  // Call after roads and terrain
  placeDenseBuildings(420);

  // ... Ab purana zoneGroup (POI buildings), High Court, Human, Car, Controls, Joystick, Update loop etc. pura paste kar do

  // Start the game
  document.getElementById('loadingMsg').style.display = 'none';
  // start button listener etc.

})();
