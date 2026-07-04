(function(){
  // ================= GEO DATA =================
  const RAW_OUTLINE = [
    [30.4,77.3],[29.8,77.0],[29.3,77.05],[28.8,77.0],[28.55,77.05],[28.2,77.3],
    [27.6,77.2],[27.0,77.35],[26.6,77.7],[26.2,78.0],[25.7,78.1],[25.2,78.3],
    [24.7,78.3],[24.3,78.6],[24.0,79.0],[23.9,79.6],[23.85,80.3],[23.9,81.0],
    [23.95,81.6],[24.0,82.3],[24.0,83.0],[24.2,83.5],[24.5,83.9],[25.0,84.05],
    [25.5,84.2],[26.0,84.35],[26.5,84.45],[27.0,84.35],[27.4,84.1],[27.7,83.7],
    [27.75,83.2],[27.9,82.6],[28.05,82.0],[28.15,81.4],[28.3,80.9],[28.5,80.4],
    [28.65,79.9],[28.7,79.4],[28.85,79.0],[29.0,78.6],[29.3,78.3],[29.7,78.0],
    [30.0,77.7],[30.4,77.3]
  ];
  const RIVER_GANGA = [[29.37,78.13],[28.78,78.10],[27.9,79.2],[27.05,79.92],[26.45,80.35],[26.0,81.1],[25.44,81.85],[25.32,82.97],[25.58,83.58],[25.76,84.15]];
  const RIVER_YAMUNA = [[30.1,77.4],[28.95,77.22],[27.49,77.67],[27.18,78.02],[26.78,79.02],[25.95,80.15],[25.44,81.85]];
  const RAW_SEEDS = [
    ["Saharanpur",29.97,77.55],["Muzaffarnagar",29.47,77.70],["Bijnor",29.37,78.13],
    ["Baghpat",28.95,77.22],["Meerut",28.98,77.70],["Moradabad",28.84,78.78],
    ["Ghaziabad",28.67,77.43],["Rampur",28.80,79.03],["Bulandshahr",28.40,77.85],
    ["Pilibhit",28.63,79.80],["Bareilly",28.35,79.42],["Aligarh",27.88,78.08],
    ["Budaun",28.03,79.12],["Lakhimpur Kheri",27.95,80.78],["Shahjahanpur",27.88,79.91],
    ["Mathura",27.49,77.67],["Etah",27.63,78.66],["Hardoi",27.42,80.13],
    ["Sitapur",27.57,80.68],["Bahraich",27.57,81.60],["Balrampur",27.43,82.18],
    ["Agra",27.18,78.02],["Mainpuri",27.23,79.02],["Sant Kabir Nagar",26.77,83.03],
    ["Maharajganj",27.15,83.56],["Firozabad",27.15,78.40],["Kannauj",27.05,79.92],
    ["Barabanki",26.93,81.19],["Gonda",27.13,81.96],["Siddharthnagar",27.28,83.03],
    ["Kushinagar",26.74,83.89],["Farrukhabad",27.39,79.58],["Etawah",26.78,79.02],
    ["Lucknow",26.85,80.95],["Faizabad",26.77,82.15],["Basti",26.81,82.73],
    ["Gorakhpur",26.76,83.37],["Kanpur",26.45,80.35],["Unnao",26.55,80.49],
    ["Raebareli",26.23,81.23],["Sultanpur",26.26,82.07],["Ambedkar Nagar",26.43,82.60],
    ["Azamgarh",26.07,83.18],["Deoria",26.50,83.79],["Mau",25.94,83.56],
    ["Ballia",25.76,84.15],["Jalaun",26.15,79.33],["Fatehpur",25.93,80.81],
    ["Pratapgarh",25.90,81.94],["Jaunpur",25.75,82.68],["Ghazipur",25.58,83.58],
    ["Jhansi",25.45,78.57],["Hamirpur",25.95,80.15],["Banda",25.48,80.34],
    ["Varanasi",25.32,82.97],["Mahoba",25.29,79.87],["Chitrakoot",25.20,80.91],
    ["Allahabad",25.44,81.85],["Mirzapur",25.15,82.57],["Sonbhadra",24.68,83.07],
    ["Lalitpur",24.69,78.41]
  ];
  const HOME_NAME = "Lucknow";

  // POIs: 2 hotels / 2 restaurants / 2 malls / 1 police / 1 school per zone (trimmed set)
  const POI = {
    "Lucknow":{h:["Taj Mahal Lucknow","Hyatt Regency"],r:["Tunday Kababi","Royal Cafe"],m:["Lulu Mall","Saharaganj Mall"],p:"Hazratganj Kotwali",s:"La Martiniere College"},
    "Kanpur":{h:["Landmark Hotel","Regenta Central"],r:["Thaggu Ke Laddu","Aromas"],m:["Z Square Mall","South X Mall"],p:"Swaroop Nagar Thana",s:"IIT Kanpur"},
    "Ghaziabad":{h:["Radisson Blu","The Leela Ambience"],r:["Barbeque Nation","The Yellow Chilli"],m:["DLF Mall of India","The Great India Place"],p:"Sector 20 Police Station",s:"Amity University"},
    "Varanasi":{h:["Taj Ganges","Ramada Plaza"],r:["Kashi Chat Bhandar","Canton Royale"],m:["JHV Mall","IP Mall"],p:"Dashashwamedh Thana",s:"BHU"},
    "Allahabad":{h:["Hotel Kanha Shyam","Grand Continental"],r:["El Chico","Jade Garden"],m:["Vinayak City Centre","Atlantis Mall"],p:"Civil Lines Thana",s:"Allahabad University"},
    "Agra":{h:["The Oberoi Amarvilas","ITC Mughal"],r:["Pinch of Spice","Dasaprakash"],m:["TDI Mall","Pacific Taj Mall"],p:"Tajganj Thana",s:"St. John's College"},
    "Gorakhpur":{h:["Radisson Blu","Hotel Clark Grand"],r:["Choudhary Sweet House","Cinnamon Restaurant"],m:["Orion Mall","City Mall"],p:"Cantt Thana",s:"DDU Gorakhpur University"},
    "Meerut":{h:["Hotel Bravura Gold Resort","Country Inn & Suites"],r:["Olivia Restaurant","Golden Palms"],m:["Melange Mall","Era Mall"],p:"Civil Lines Thana",s:"CCS University"},
    "Jhansi":{h:["Nataraj Sarovar","Jhansi Hotel"],r:["Narayan Chat","Standard Restaurant"],m:["Cross Road Mall","Vishal Mega Mart"],p:"Nawabad Thana",s:"Bundelkhand University"},
    "Bareilly":{h:["Hotel Radisson","Phoenix Hotel"],r:["Aurum","Kwality Restaurant"],m:["Phoenix United Mall","Amrapali Mall"],p:"Kotwali Bareilly",s:"MJPRU"},
    "Mathura":{h:["Radha Ashok","Best Western"],r:["Brijwasi Mithaiwala","Taj Restaurant"],m:["Highway Plaza","Krishna Mall"],p:"Kotwali Mathura",s:"GLA University"},
    "Moradabad":{h:["Holiday Regency","Mansarovar"],r:["Gulshan-e-Karim","Loveena"],m:["Wave Mall","Parsvnath Plaza"],p:"Civil Lines Thana",s:"TMU"},
    "Saharanpur":{h:["Hotel Royal Palace","Sunrise"],r:["Pure Veg Rasoi","Jafraan"],m:["Gagan Mall","Sriram Market"],p:"Kutubsher Thana",s:"Glocal University"},
    "Faizabad":{h:["Taj Ayodhya","Park Inn by Radisson"],r:["Makhan Mishri","Amrapali"],m:["Awadh Shopping Complex","City Cart"],p:"Kotwali Ayodhya",s:"Avadh University"},
    "Firozabad":{h:["Hotel Pajasa","Sunrise"],r:["Garg Richi Rich","Heera"],m:["SRS Mall","City Center Complex"],p:"Uttar Thana",s:"PD Jain College"},
    "Muzaffarnagar":{h:["Hotel Omega","Hotel King"],r:["Radiant Inn","Milan Restaurant"],m:["Almas Mall","City Center"],p:"Civil Lines Thana",s:"SD College"},
    "Rampur":{h:["Hotel Modi Castle","Hotel Landmark"],r:["Shama Chicken","Mezbaan"],m:["Modi Mall Complex","City Cart"],p:"Civil Lines Thana",s:"Jauhri College"},
    "Kannauj":{h:["Hotel Raj","Ashish Palace"],r:["Aroma Restaurant","Kanha Rasoi"],m:["Kannauj City Center","Vishal Mart"],p:"Kotwali Kannauj",s:"Govt Medical College"},
    "Etawah":{h:["Hotel Relax","Kunal Hotel"],r:["Highway Treat","Sagar Restaurant"],m:["Etawah Shopping Mall","City Square"],p:"Civil Lines Thana",s:"Saifai Medical College"},
    "Bulandshahr":{h:["Hotel Renaissance","River View"],r:["Delhi Darbar","Bikaner"],m:["Golden Tower","Vishal Mart"],p:"Kotwali Nagar",s:"DPBS College"},
    "Baghpat":{h:["Hotel Royal","Milan Hotel"],r:["Chotiwala","Shiva Dhaba"],m:["Baghpat Central Market","V-Mart"],p:"Kotwali Baghpat",s:"Digambar Jain College"},
    "Bijnor":{h:["Hotel Midtown","Galaxy"],r:["Mezbaan","Shahi Rasoi"],m:["Bijnor Shopping Complex","V-Mart"],p:"Kotwali Nagar",s:"Vardhaman College"},
    "Budaun":{h:["Hotel Bharat","Grand Inn"],r:["Sagar Restaurant","Choice"],m:["Budaun Plaza","City Cart"],p:"Kotwali Nagar",s:"GIC Budaun"},
    "Shahjahanpur":{h:["Hotel Satyam","Royal Comfort"],r:["Mezbaan","Choice Veg"],m:["Grand Plaza","Vishal Mart"],p:"Chowk Kotwali",s:"GF College"},
    "Pilibhit":{h:["Hotel Grand","Tiger Den Resort"],r:["Chuka Treat","Shahi Veg"],m:["Pilibhit Plaza","City Cart"],p:"Sunagarhi Thana",s:"Upadhi College"},
    "Lakhimpur Kheri":{h:["Hotel Landmark","Dudhwa Jungle Resort"],r:["Shahi Rasoi","Milan Restaurant"],m:["Kheri Plaza","Vishal Mart"],p:"Kotwali Nagar",s:"YD College"},
    "Sitapur":{h:["Hotel Castle","Shanti Palace"],r:["Vaibhav Restaurant","Delhi Bite"],m:["Sitapur Plaza","City Cart"],p:"Kotwali Nagar",s:"RMP College"},
    "Hardoi":{h:["Hotel Shanti","Preet Palace"],r:["Standard Veg","Milan Restaurant"],m:["Hardoi Shopping Plaza","V-Mart"],p:"Kotwali Nagar",s:"CSN College"},
    "Unnao":{h:["Hotel Trishul","Unnao Inn"],r:["Tiwari Chat","Mezbaan"],m:["Unnao Plaza","Vishal Mart"],p:"Kotwali Nagar",s:"DSN College"},
    "Raebareli":{h:["Hotel Shalimar","Golden Palace"],r:["Mezbaan","Celebration"],m:["Malik Plaza","City Cart"],p:"Kotwali Nagar",s:"Feroze Gandhi College"},
    "Farrukhabad":{h:["Hotel Royal","Rajputana"],r:["Shahi Darbar","Kanha Veg"],m:["Farrukhabad Complex","V-Mart"],p:"Kadri Gate Thana",s:"Badri Vishal College"},
    "Mainpuri":{h:["Hotel Raj Palace","KPS Residency"],r:["Sagar Veg","Shahi Darbar"],m:["Mainpuri Plaza","City Cart"],p:"Kotwali Nagar",s:"Christian College"},
    "Etah":{h:["Hotel Shikhar","Ashoka"],r:["Kanha Veg","Shahi"],m:["Etah Shopping Complex","V-Mart"],p:"Kotwali Nagar",s:"JLN College"},
    "Jalaun":{h:["Hotel Amber","Shatabdi Inn"],r:["Milan Veg","Shahi"],m:["Orai Shopping Plaza","City Cart"],p:"Kotwali Orai",s:"DV College Orai"},
    "Hamirpur":{h:["Hotel Anand","Sagar Inn"],r:["Milan Restaurant","Shahi"],m:["Hamirpur Center","V-Mart"],p:"Kotwali Hamirpur",s:"BNV College"},
    "Mahoba":{h:["Hotel Midtown","Rahila Inn"],r:["Sagar Veg","Choice"],m:["Mahoba Market Square","V-Mart"],p:"Kotwali Mahoba",s:"Govt PG College"},
    "Banda":{h:["Hotel Bundelkhand","Heera Palace"],r:["Sagar Veg","Khana Khazana"],m:["Banda Plaza","City Cart"],p:"Kotwali Banda",s:"JN College"},
    "Chitrakoot":{h:["RamKripa Inn","Tourist Bungalow"],r:["Ram Rasoi","Kamadgiri Veg"],m:["Chitrakoot Arcade","Local Shopping Center"],p:"Kotwali Karvi",s:"Goswami Tulsidas College"},
    "Fatehpur":{h:["Hotel Inndia","Raj Inn"],r:["Milan Veg","Choice"],m:["Fatehpur Plaza","City Cart"],p:"Kotwali Nagar",s:"AS College"},
    "Pratapgarh":{h:["Hotel Bharat","Raj Palace"],r:["Sagar Veg","Shahi Darbar"],m:["Pratapgarh Complex","City Cart"],p:"Kotwali Nagar",s:"MDPG College"},
    "Sultanpur":{h:["Hotel Garden View","Raj Inn"],r:["Sagar Veg","Choice Restaurant"],m:["Sultanpur Plaza","City Cart"],p:"Kotwali Nagar",s:"KNIT Sultanpur"},
    "Barabanki":{h:["Hotel Amber","Sagar Palace"],r:["Mezbaan","Milan Restaurant"],m:["Barabanki Plaza","City Cart"],p:"Kotwali Nagar",s:"JIC Barabanki"},
    "Bahraich":{h:["Hotel Brij","Sravasti Inn"],r:["Mezbaan","Choice Restaurant"],m:["Bahraich Plaza","City Cart"],p:"Kotwali Nagar",s:"Kisan PG College"},
    "Balrampur":{h:["Hotel Lotus","Raj Palace"],r:["Sagar Veg","Shahi"],m:["Balrampur Market","V-Mart"],p:"Kotwali Nagar",s:"MLK PG College"},
    "Gonda":{h:["Hotel Grand","Central Inn"],r:["Milan","Mezbaan"],m:["Gonda Shopping Plaza","City Cart"],p:"Kotwali Nagar",s:"LBS PG College"},
    "Siddharthnagar":{h:["Hotel Buddha","Pawan"],r:["Lotus Veg","Shahi"],m:["Naugarh Market Square","V-Mart"],p:"Kotwali Naugarh",s:"Buddha College"},
    "Basti":{h:["Hotel Balaji","Royal Palace"],r:["Sagar Veg","Shahi"],m:["Basti Shopping Plaza","City Cart"],p:"Kotwali Nagar",s:"APN PG College"},
    "Sant Kabir Nagar":{h:["Hotel Kabir","Sunrise"],r:["Maghar Treat","Choice"],m:["Khalilabad Market Center","V-Mart"],p:"Kotwali Khalilabad",s:"HR PG College"},
    "Maharajganj":{h:["Hotel Shanti","Heritage Inn"],r:["Sagar Veg","Choice Restaurant"],m:["Maharajganj Plaza","V-Mart"],p:"Kotwali Nagar",s:"Gorakhnath College"},
    "Kushinagar":{h:["The Imperial","Royal Residency"],r:["Yama Cafe","Milan"],m:["Kushinagar Tourist Plaza","V-Mart"],p:"Kasya Thana",s:"Buddha PG College"},
    "Deoria":{h:["Hotel Budha","Raj Inn"],r:["Milan Restaurant","Shahi"],m:["Deoria Plaza","City Cart"],p:"Kotwali Nagar",s:"BRDPG College"},
    "Azamgarh":{h:["Hotel Golden Fortune","Raj Inn"],r:["Sagar Veg","Milan Restaurant"],m:["Azamgarh Plaza","City Cart"],p:"Kotwali Nagar",s:"DAV College"},
    "Mau":{h:["Hotel Greenland","Sunrise"],r:["Shahi Rasoi","Choice"],m:["Mau Central Market","City Cart"],p:"Kotwali Nagar",s:"DCSK College"},
    "Ballia":{h:["Hotel Grand","Ashoka Inn"],r:["Milan Veg","Choice"],m:["Ballia Shopping Center","City Cart"],p:"Kotwali Nagar",s:"TD College Ballia"},
    "Jaunpur":{h:["Hotel River View","Raj Inn"],r:["Mezbaan","Milan Restaurant"],m:["Jaunpur Plaza","City Cart"],p:"Kotwali Nagar",s:"TD College Jaunpur"},
    "Ghazipur":{h:["Hotel Oasis","Grand Inn"],r:["Milan Veg","Choice"],m:["Ghazipur Plaza","City Cart"],p:"Kotwali Nagar",s:"PG College Ghazipur"},
    "Mirzapur":{h:["Hotel River View","Raj Palace"],r:["Vindhya Rasoi","Choice Veg"],m:["Mirzapur Plaza","City Cart"],p:"Kotwali Katra",s:"KBPG College"},
    "Sonbhadra":{h:["Hotel Hindalco","Raj Inn"],r:["Renukoot Treat","Shahi"],m:["Robertsganj Complex","V-Mart"],p:"Kotwali Robertsganj",s:"Raja Sharda Mahesh College"},
    "Ambedkar Nagar":{h:["Hotel Shane-Avadh","Sunrise"],r:["Shahi Rasoi","Choice"],m:["Akbarpur Plaza","City Cart"],p:"Kotwali Akbarpur",s:"BNKB College"},
    "Lalitpur":{h:["Hotel Deogarh","Sagar Inn"],r:["Milan Veg","Shahi"],m:["Lalitpur Plaza","City Cart"],p:"Kotwali Lalitpur",s:"Nehru College"},
    "Aligarh":{h:["Hotel Shanti","Royal Comfort"],r:["Heera Chat","Milan"],m:["Hathras Complex","City Cart"],p:"AMU Gate Thana",s:"Aligarh Muslim University"}
  };

  // landmark first-entry per zone (style hint keyword)
  const LANDMARK = {
    "Agra":"Taj Mahal","Aligarh":"Aligarh Fort","Allahabad":"Allahabad Fort","Ambedkar Nagar":"Shivbaba Ashram",
    "Sultanpur":"Bijethua Mahaviran Temple","Moradabad":"Jama Masjid","Etawah":"Etawah Fort","Faizabad":"Ram Janmabhoomi Temple",
    "Azamgarh":"Bhawarnath Temple","Baghpat":"Pura Mahadev Temple","Bahraich":"Dargah Sharif","Ballia":"Bhrigu Temple",
    "Balrampur":"Patan Devi Temple","Banda":"Kalinjar Fort","Barabanki":"Dewa Sharif","Bareilly":"Alakhnath Temple",
    "Basti":"Bhadreshwar Nath Temple","Bijnor":"Vidur Kuti","Budaun":"Jama Masjid","Bulandshahr":"Ahar Ghat",
    "Chitrakoot":"Kamadgiri Parvat","Deoria":"Dugdheshwarnath Temple","Etah":"Jalesar Bell Temple","Farrukhabad":"Sankisa Stupa",
    "Fatehpur":"Asothar Fort","Firozabad":"Suhaag Nagri Tower","Ghaziabad":"ISKCON Temple","Ghazipur":"Cornwallis Tomb",
    "Gonda":"Swami Narayan Chhapiya Temple","Gorakhpur":"Gorakhnath Temple","Hamirpur":"Sinhavahini Temple","Hardoi":"Prahlad Nagri",
    "Jaunpur":"Atala Masjid","Jhansi":"Jhansi Fort","Jalaun":"Kalpi Ram Mandir","Kannauj":"Raja Jaichand Fort",
    "Kanpur":"JK Temple","Kushinagar":"Mahaparinirvana Stupa","Lakhimpur Kheri":"Oel Frog Temple","Lalitpur":"Dashavatara Temple",
    "Lucknow":"Bara Imambara","Mahoba":"Rahila Sun Temple","Maharajganj":"Lehda Devi Temple","Mainpuri":"Chyavan Rishi Ashram",
    "Mathura":"Krishna Janmabhoomi Temple","Mau":"Vandevi Mata Temple","Meerut":"Aughadnath Temple","Mirzapur":"Vindhyavasini Temple",
    "Muzaffarnagar":"Shuktirth Temple","Pilibhit":"Gauri Shankar Temple","Pratapgarh":"Belha Devi Temple","Raebareli":"Dalmau Fort",
    "Rampur":"Raza Library","Saharanpur":"Shakumbhari Devi Temple","Sant Kabir Nagar":"Kabir Samadhi","Shahjahanpur":"Kali Mata Temple",
    "Siddharthnagar":"Piprahwa Stupa","Sitapur":"Naimisharanya Temple","Sonbhadra":"Vijaygarh Fort","Varanasi":"Kashi Vishwanath Temple",
    "Bareilly ":"Alakhnath Temple"
  };

  // ================= PROJECTION (km-accurate, real UP area 2,43,286 km²) =================
  const PAD_KM = 12;
  let lonMin=Infinity, lonMax=-Infinity, latMin=Infinity, latMax=-Infinity;
  RAW_OUTLINE.concat(RAW_SEEDS.map(s=>[s[1],s[2]])).forEach(p=>{
    if(p[1]<lonMin) lonMin=p[1]; if(p[1]>lonMax) lonMax=p[1];
    if(p[0]<latMin) latMin=p[0]; if(p[0]>latMax) latMax=p[0];
  });
  const AVG_LAT_RAD = (latMin+latMax)/2*Math.PI/180;
  const KM_PER_DEG_LAT = 111.0, KM_PER_DEG_LON = 111.320*Math.cos(AVG_LAT_RAD);
  const PX_PER_KM = 34; // mega-map pass — same UP boundary, biggest open world yet (was 22)
  function proj(lat,lon){
    return { x:((lon-lonMin)*KM_PER_DEG_LON+PAD_KM)*PX_PER_KM, z:((latMax-lat)*KM_PER_DEG_LAT+PAD_KM)*PX_PER_KM };
  }
  const WORLD_W = ((lonMax-lonMin)*KM_PER_DEG_LON+PAD_KM*2)*PX_PER_KM;
  const WORLD_H = ((latMax-latMin)*KM_PER_DEG_LAT+PAD_KM*2)*PX_PER_KM;
  const OUTLINE = RAW_OUTLINE.map(p=>proj(p[0],p[1]));
  const GANGA = RIVER_GANGA.map(p=>proj(p[0],p[1]));
  const YAMUNA = RIVER_YAMUNA.map(p=>proj(p[0],p[1]));
  // real-world hill regions, used to shape elevation instead of a flat plate
  const BUNDELKHAND_CENTER = proj(25.35, 79.35); // Jhansi / Lalitpur / Mahoba / Banda / Chitrakoot upland
  const VINDHYA_CENTER = proj(24.85, 82.85);     // Sonbhadra / Mirzapur hill country

  function pointInPolygon(x,y,poly){
    let inside=false;
    for(let i=0,j=poly.length-1;i<poly.length;j=i++){
      const xi=poly[i].x, yi=poly[i].z, xj=poly[j].x, yj=poly[j].z;
      const intersect=((yi>y)!==(yj>y)) && (x < (xj-xi)*(y-yi)/(yj-yi)+xi);
      if(intersect) inside=!inside;
    }
    return inside;
  }
  // --- distance from a point to a polyline, used to carve river valleys into the terrain ---
  function distToPolyline(x,z,pts){
    let best=Infinity;
    for(let i=0;i<pts.length-1;i++){
      const ax=pts[i].x, az=pts[i].z, bx=pts[i+1].x, bz=pts[i+1].z;
      const dx=bx-ax, dz=bz-az;
      const len2 = dx*dx+dz*dz || 1;
      let t = ((x-ax)*dx + (z-az)*dz)/len2;
      t = Math.max(0, Math.min(1,t));
      const px = ax+dx*t, pz = az+dz*t;
      const d = Math.hypot(x-px, z-pz);
      if(d<best) best=d;
    }
    return best;
  }
  function smoothstep(a,b,x){ const t = Math.max(0,Math.min(1,(x-a)/(b-a))); return t*t*(3-2*t); }

  // rolling base terrain — several octaves of sine "noise" with domain warp so it never reads as flat
  function baseRoll(x,z){
    const wx = x + Math.sin(z*0.0009)*90;      // domain warp so hills aren't a perfect grid
    const wz = z + Math.cos(x*0.0011)*90;
    let h = 0;
    h += Math.sin(wx*0.0016)*9 + Math.cos(wz*0.0019+1.1)*7;
    h += Math.sin((wx+wz)*0.0010)*6;
    h += Math.sin(wx*0.0042-0.6)*3 + Math.cos(wz*0.0037+2.1)*2.4;
    h += Math.sin(wx*0.011)*1.1 + Math.cos(wz*0.013)*0.9; // fine detail bumps
    return h;
  }
  // ridged noise gives the jagged Vindhya/Bundelkhand plateau edges a rockier silhouette
  function ridged(x,z,freq){
    const n = Math.sin(x*freq)+Math.cos(z*freq*1.37+0.7);
    return (1 - Math.abs(n*0.5)) * 2 - 1;
  }
  function terrainNoise(x,z){
    let h = baseRoll(x,z);

    // Himalayan-terai foothill belt hugs the entire northern boundary of UP (small z = further north)
    const foothill = smoothstep(WORLD_H*0.22, 0, z);
    h += foothill * (24 + ridged(x,z,0.0026)*8);

    // Bundelkhand plateau — rocky upland around Jhansi / Lalitpur / Mahoba / Banda / Chitrakoot
    const dBun = Math.hypot(x-BUNDELKHAND_CENTER.x, z-BUNDELKHAND_CENTER.z);
    const bundelkhand = smoothstep(260, 0, dBun);
    h += bundelkhand * (22 + ridged(x,z,0.0034)*8);

    // Vindhya hill country around Sonbhadra / Mirzapur, in the far south-east
    const dVin = Math.hypot(x-VINDHYA_CENTER.x, z-VINDHYA_CENTER.z);
    const vindhya = smoothstep(230, 0, dVin);
    h += vindhya * (20 + ridged(x,z,0.0030)*9);

    // gentle valley carve along the Ganga and Yamuna so the rivers actually sit in a dip
    const dG = distToPolyline(x,z,GANGA), dY = distToPolyline(x,z,YAMUNA);
    const riverCarve = Math.max(0, 1 - Math.min(dG,dY)/140);
    h -= riverCarve*riverCarve*8;

    return h;
  }
  function terrainHeight(x,z){
    if(!pointInPolygon(x,z,OUTLINE)) return -6;
    return terrainNoise(x,z);
  }

  function goldenColor(i){ return new THREE.Color().setHSL(((i*137.508)%360)/360, 0.55, 0.42); }
  const ZONES = RAW_SEEDS.map((s,i)=>{
    const p = proj(s[1],s[2]);
    return { name:s[0], x:p.x, z:p.z, color: goldenColor(i), owner: s[0]===HOME_NAME?'player':'rival', progress: s[0]===HOME_NAME?1:0 };
  });
  const homeIdx = ZONES.findIndex(z=>z.name===HOME_NAME);
  const PLAYER_COLOR = new THREE.Color(0xffd166);

  function nearestZone(x,z){
    let best=-1,bd=Infinity;
    for(let i=0;i<ZONES.length;i++){ const dx=ZONES[i].x-x,dz=ZONES[i].z-z,d=dx*dx+dz*dz; if(d<bd){bd=d;best=i;} }
    return best;
  }

  // ================= THREE.JS SETUP =================
  const canvas = document.getElementById('canvas3d');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x9fd1ff);
  scene.fog = new THREE.FogExp2(0xaee2ff, 0.0002);

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth/window.innerHeight, 1, 20000);

  const sun = new THREE.DirectionalLight(0xfff2d6, 1.1);
  sun.position.set(1300,1800,650);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.far = 11000;
  sun.shadow.camera.left = -850; sun.shadow.camera.right = 850;
  sun.shadow.camera.top = 850; sun.shadow.camera.bottom = -850;
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0x8899cc, 0.65));
  scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x33422a, 0.5));

  window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // ---------- Terrain ----------
  const SEG_X = 210, SEG_Z = 190;
  const terrainGeo = new THREE.PlaneGeometry(WORLD_W, WORLD_H, SEG_X, SEG_Z);
  terrainGeo.rotateX(-Math.PI/2);
  const posAttr = terrainGeo.attributes.position;
  const colors = [];
  for(let i=0;i<posAttr.count;i++){
    const x = posAttr.getX(i) + WORLD_W/2;
    const z = posAttr.getZ(i) + WORLD_H/2;
    const h = terrainHeight(x,z);
    posAttr.setY(i, h);
    let col;
    if(h<=-5.5){ col = new THREE.Color(0x2a2f45); } // outside state
    else {
      const zi = nearestZone(x,z);
      const owned = ZONES[zi].owner==='player';
      col = owned ? PLAYER_COLOR.clone() : ZONES[zi].color.clone();
      col.lerp(new THREE.Color(0x8fae5a), 0.35); // blend toward green land tone
    }
    colors.push(col.r,col.g,col.b);
  }
  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors,3));
  terrainGeo.computeVertexNormals();
  const terrainMat = new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.95, metalness:0.02 });
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.receiveShadow = true;
  terrainMesh.position.set(-WORLD_W/2, 0, -WORLD_H/2); // shift so world (0,0) is corner
  // Actually keep terrain centered at origin covering [0,W]x[0,H] in our x,z coords:
  terrainMesh.position.set(0,0,0);
  terrainMesh.geometry.translate(WORLD_W/2, 0, WORLD_H/2);
  scene.add(terrainMesh);

  // ---------- Rivers ----------
  function buildRiver(points, width, color){
    const grp = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color, roughness:0.3, metalness:0.1, transparent:true, opacity:0.85 });
    for(let i=0;i<points.length-1;i++){
      const a=points[i], b=points[i+1];
      const dx=b.x-a.x, dz=b.z-a.z, len=Math.hypot(dx,dz);
      const geo = new THREE.PlaneGeometry(width, len);
      geo.rotateX(-Math.PI/2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((a.x+b.x)/2, terrainHeight((a.x+b.x)/2,(a.z+b.z)/2)+0.6, (a.z+b.z)/2);
      mesh.rotation.y = -Math.atan2(dz,dx)+Math.PI/2;
      grp.add(mesh);
    }
    return grp;
  }
  scene.add(buildRiver(GANGA, 62, 0x3f8fd6));
  scene.add(buildRiver(YAMUNA, 46, 0x3fb8b0));

  // ---------- Roads ----------
  const ROAD_SEGMENTS = []; // used later to draw the GTA-style radar
  function buildRoad(a,b,width,type){
    type = type || 'local';
    const dx=b.x-a.x, dz=b.z-a.z, len=Math.hypot(dx,dz);
    const geo = new THREE.PlaneGeometry(width, len);
    geo.rotateX(-Math.PI/2);
    const color = type==='highway' ? 0xd9a24b : 0x2b2b30;
    const mat = new THREE.MeshStandardMaterial({ color, roughness:0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((a.x+b.x)/2, type==='highway'?0.45:0.4, (a.z+b.z)/2);
    mesh.rotation.y = -Math.atan2(dz,dx)+Math.PI/2;
    mesh.receiveShadow = true;
    if(type==='highway'){
      // yellow centre-line strip, like the National Highway markings on the reference map
      const lineGeo = new THREE.PlaneGeometry(width*0.12, len);
      lineGeo.rotateX(-Math.PI/2);
      const lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({color:0xfff2c9}));
      lineMesh.position.set(0,0.06,0);
      mesh.add(lineMesh);
    }
    ROAD_SEGMENTS.push({ax:a.x,az:a.z,bx:b.x,bz:b.z,type});
    return mesh;
  }
  const roadGroup = new THREE.Group();
  // grey "major roads" — connect each district to its nearest neighbor
  ZONES.forEach((z,i)=>{
    let best=-1,bd=Infinity;
    ZONES.forEach((z2,j)=>{ if(i===j) return; const d=(z.x-z2.x)**2+(z.z-z2.z)**2; if(d<bd){bd=d;best=j;} });
    if(best>=0) roadGroup.add(buildRoad(z, ZONES[best], 14, 'local'));
  });
  // orange "national highways" — routes + NH numbers approximating the real UP highway map
  const HIGHWAY_EDGES = [
    ["Saharanpur","Muzaffarnagar","334"],["Muzaffarnagar","Meerut","58"],["Meerut","Bijnor","119"],["Meerut","Ghaziabad","34"],
    ["Ghaziabad","Baghpat","334"],["Ghaziabad","Bulandshahr","34"],["Bulandshahr","Aligarh","34"],["Aligarh","Etah","91"],
    ["Moradabad","Bijnor","9"],["Moradabad","Rampur","24"],["Rampur","Bareilly","24"],["Bareilly","Pilibhit","730"],
    ["Bareilly","Budaun","530"],["Bareilly","Shahjahanpur","24"],["Shahjahanpur","Hardoi","24"],["Hardoi","Lucknow","24"],
    ["Pilibhit","Lakhimpur Kheri","730"],["Lakhimpur Kheri","Sitapur","730"],["Sitapur","Lucknow","730"],["Sitapur","Bahraich","927"],
    ["Bahraich","Gonda","927"],["Gonda","Balrampur","730"],["Gonda","Faizabad","330"],
    ["Etah","Mainpuri","91"],["Mainpuri","Etawah","19"],["Etawah","Farrukhabad","34"],["Farrukhabad","Kannauj","34"],["Kannauj","Kanpur","34"],
    ["Agra","Firozabad","19"],["Firozabad","Etawah","19"],["Agra","Mathura","19"],["Mathura","Aligarh","93"],
    ["Kanpur","Unnao","25"],["Unnao","Lucknow","25"],["Kanpur","Fatehpur","19"],["Fatehpur","Allahabad","19"],
    ["Kanpur","Hamirpur","34"],["Hamirpur","Banda","76"],["Banda","Chitrakoot","35"],["Banda","Mahoba","76"],["Mahoba","Jhansi","26"],["Jhansi","Lalitpur","44"],
    ["Lucknow","Barabanki","28"],["Barabanki","Faizabad","28"],["Faizabad","Ambedkar Nagar","330"],["Ambedkar Nagar","Sultanpur","730A"],
    ["Sultanpur","Jaunpur","731"],["Jaunpur","Varanasi","56"],
    ["Lucknow","Raebareli","30"],["Raebareli","Pratapgarh","30"],["Pratapgarh","Allahabad","30"],
    ["Allahabad","Mirzapur","19"],["Mirzapur","Varanasi","19"],["Mirzapur","Sonbhadra","39"],
    ["Varanasi","Ghazipur","31"],["Ghazipur","Ballia","31"],
    ["Faizabad","Basti","28"],["Basti","Sant Kabir Nagar","28"],["Basti","Siddharthnagar","28"],["Basti","Gorakhpur","28"],
    ["Gorakhpur","Maharajganj","730"],["Gorakhpur","Kushinagar","28"],["Gorakhpur","Deoria","28"],["Deoria","Ballia","28"],
    ["Gorakhpur","Azamgarh","28"],["Azamgarh","Mau","233"],["Mau","Ballia","233"],["Azamgarh","Jaunpur","233"],
    ["Budaun","Bareilly","530"],["Saharanpur","Bijnor","74"],["Bijnor","Rampur","74"],
    ["Lakhimpur Kheri","Balrampur","730"],["Balrampur","Siddharthnagar","730"],
    ["Chitrakoot","Allahabad","35"],["Ghazipur","Mau","31"],["Sonbhadra","Varanasi","39"]
  ];
  // canvas-drawn NH shield sprite, styled after the yellow/orange highway markers on the reference road map
  function roundRectPath(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  }
  function makeHighwayShield(label){
    const cnv = document.createElement('canvas'); cnv.width=160; cnv.height=72;
    const ctx = cnv.getContext('2d');
    ctx.fillStyle = '#ffb400'; ctx.strokeStyle = '#1a1035'; ctx.lineWidth = 6;
    roundRectPath(ctx,5,5,150,62,12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#1a1035'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.font = 'bold 26px Arial'; ctx.fillText('NH', 80, 26);
    ctx.font = 'bold 30px Arial'; ctx.fillText(label, 80, 54);
    const tex = new THREE.CanvasTexture(cnv);
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({map:tex, depthTest:true, transparent:true}));
    spr.scale.set(20,9,1);
    return spr;
  }
  HIGHWAY_EDGES.forEach(([n1,n2,label])=>{
    const a = ZONES.find(z=>z.name===n1), b = ZONES.find(z=>z.name===n2);
    if(!a||!b) return;
    roadGroup.add(buildRoad(a,b,32,'highway'));
    if(label){
      const mx=(a.x+b.x)/2, mz=(a.z+b.z)/2;
      const shield = makeHighwayShield(label);
      shield.position.set(mx, terrainHeight(mx,mz)+7, mz);
      roadGroup.add(shield);
    }
  });
  scene.add(roadGroup);

  // ---------- Building generators ----------
  function box(w,h,d,color,rough){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), new THREE.MeshStandardMaterial({color,roughness:rough||0.8})); m.castShadow=true; m.receiveShadow=true; return m; }
  function cyl(r1,r2,h,color,rough){ const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,12), new THREE.MeshStandardMaterial({color,roughness:rough||0.8})); m.castShadow=true; return m; }
  function cone(r,h,color){ const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,10), new THREE.MeshStandardMaterial({color,roughness:0.7})); m.castShadow=true; return m; }
  function sph(r,color){ const m=new THREE.Mesh(new THREE.SphereGeometry(r,14,10), new THREE.MeshStandardMaterial({color,roughness:0.5,metalness:0.1})); m.castShadow=true; return m; }

  function hotelBuilding(){
    const g = new THREE.Group();
    const base = box(10,5,10,0xcfa15a); base.position.y=2.5; g.add(base);
    const tower = box(6.5,18,6.5,0xe6d3a3); tower.position.y=5+9; g.add(tower);
    for(let f=0;f<8;f++){
      const winA=box(6.8,0.5,0.25,0x3a6ea5); winA.position.set(0,5+f*2.1+1,3.3); tower.add(winA);
      const winB=box(0.25,0.5,6.8,0x3a6ea5); winB.position.set(3.3,5+f*2.1+1,0); tower.add(winB);
    }
    const roofCap = box(7,0.8,7,0x8a6a3a); roofCap.position.y=5+18+0.4; g.add(roofCap);
    const sign = box(3,1,0.3,0xffd166); sign.position.set(0,5+1.2,5.1); g.add(sign);
    return g;
  }
  function mallBuilding(){
    const g = new THREE.Group();
    const base = box(16,7,12,0xb9becb); base.position.y=3.5; g.add(base);
    const wing = box(9,5,6,0xc7ccd6); wing.position.set(9,2.5,-2); g.add(wing);
    const glass = box(15,5,0.3,0x6fc3d6); glass.position.set(0,3.2,6.1); g.add(glass);
    for(let c=-6;c<=6;c+=3){ const mull=box(0.2,5,0.4,0x8fa4ad); mull.position.set(c,3.2,6.2); g.add(mull); }
    const sign = box(6,1.2,0.3,0xffd166); sign.position.set(0,7.4,6.2); g.add(sign);
    return g;
  }
  function restaurantBuilding(){
    const g = new THREE.Group();
    const base = box(8,4,8,0xd9714e); base.position.y=2; g.add(base);
    const roof = cone(6.2,3,0x7a3b2e); roof.position.y=4+1.5; g.add(roof);
    const awn = box(8.4,0.25,2.2,0xffd166); awn.position.set(0,4,4.6); g.add(awn);
    const sign = box(4,0.9,0.2,0xfff2d6); sign.position.set(0,4.6,4.8); g.add(sign);
    return g;
  }
  function policeBuilding(){
    const g = new THREE.Group();
    const base = box(9,4.5,7.5,0xdfe6ee); base.position.y=2.25; g.add(base);
    const stripe = box(9.1,0.7,7.6,0x2a4bd7); stripe.position.y=2.5; g.add(stripe);
    const tower = box(2.4,6,2.4,0xdfe6ee); tower.position.set(3,4.5,0); g.add(tower);
    const beacon = sph(0.4,0xff3344); beacon.material.emissive=new THREE.Color(0xff2233); beacon.material.emissiveIntensity=1; beacon.position.set(3,7.7,0); g.add(beacon);
    const pole = cyl(0.08,0.08,5,0x555555); pole.position.set(-3,5,-3); g.add(pole);
    return g;
  }
  function schoolBuilding(){
    const g = new THREE.Group();
    const base = box(13,4.5,7.5,0xe8ddc0); base.position.y=2.25; g.add(base);
    for(let c=-5;c<=5;c+=1.7){ const col=cyl(0.3,0.3,4.5,0xf5f0df); col.position.set(c,2.25,4.0); g.add(col); }
    const pediment = box(13.5,0.9,8,0xcbb98a); pediment.position.y=4.7; g.add(pediment);
    const wing = box(4,3.5,5,0xe0d3ab); wing.position.set(8,1.75,-1); g.add(wing);
    return g;
  }
  function landmarkBuilding(name){
    const g = new THREE.Group();
    const n = (name||"").toLowerCase();
    if(n.includes("taj")||n.includes("mahal")){
      const plinth = box(20,1.4,20,0xdedad0); plinth.position.y=0.7; g.add(plinth);
      const base = box(14,4.5,14,0xf3f0e6); base.position.y=1.4+2.25; g.add(base);
      const dome = sph(5,0xf3f0e6); dome.position.y=1.4+4.5+5; g.add(dome);
      const finial = cone(0.5,1.6,0xd9c26a); finial.position.y=1.4+4.5+10+0.8; g.add(finial);
      const archH = box(3.2,3.4,0.3,0x2a2a30); archH.position.set(0,1.4+2,7.05); g.add(archH);
      [[7,7],[7,-7],[-7,7],[-7,-7]].forEach(([x,z])=>{ const min=cyl(0.75,0.75,10,0xf3f0e6); min.position.set(x,1.4+5,z); g.add(min);
        const cap=sph(0.9,0xf3f0e6); cap.position.set(x,1.4+10.6,z); g.add(cap);
        const spike=cone(0.15,1,0xd9c26a); spike.position.set(x,1.4+11.6,z); g.add(spike); });
      return g; // Taj silhouette reads best at native proportions
    } else if(n.includes("fort")||n.includes("quila")){
      const wall = box(19,8,19,0x9a6b45); wall.position.y=4; g.add(wall);
      const innerKeep = box(8,5,8,0x86592f); innerKeep.position.y=8+2.5; g.add(innerKeep);
      [[9,9],[9,-9],[-9,9],[-9,-9]].forEach(([x,z])=>{ const tw=cyl(2.2,2.2,11,0x86592f); tw.position.set(x,5.5,z); g.add(tw);
        const cap=cone(2.6,2,0x6f4a26); cap.position.set(x,11.5,z); g.add(cap); });
      const gate = box(3.4,5,0.4,0x3a2a18); gate.position.set(0,2.5,9.6); g.add(gate);
    } else if(n.includes("library")){
      const base = box(15,5.5,11,0xd8c9a3); base.position.y=2.75; g.add(base);
      const dome = sph(3.6,0xb5895a); dome.position.y=5.5+2.2; g.add(dome);
      const finial2 = cone(0.3,1,0xd9c26a); finial2.position.y=5.5+5.8; g.add(finial2);
      for(let c=-5.5;c<=5.5;c+=1.8){ const col=cyl(0.4,0.4,5.5,0xf0e6cf); col.position.set(c,2.75,5.7); g.add(col); }
      const pediment = box(15.4,1,11.4,0xc7b791); pediment.position.y=5.8; g.add(pediment);
    } else if(n.includes("temple")||n.includes("mandir")){
      let y=0;
      for(let s=0;s<6;s++){ const w=11-s*1.6; const bx=box(w,1.9,w,0xd97b3b); bx.position.y=y+0.95; g.add(bx); y+=1.9; }
      const spire = cone(2,5,0xd9a23b); spire.position.y=y+2.5; g.add(spire);
      const finialTop = sph(0.5,0xffd166); finialTop.position.y=y+5.3; g.add(finialTop);
      const mandapam = box(9,3,6,0xc96b32); mandapam.position.set(0,1.5,7); g.add(mandapam);
    } else if(n.includes("stupa")){
      const base=cyl(7,7,2.4,0xe8e2cf); base.position.y=1.2; g.add(base);
      const drum=cyl(5.6,5.6,2,0xe8e2cf); drum.position.y=2.4+1; g.add(drum);
      const dome=sph(6,0xe8e2cf); dome.position.y=2.4+2+6*0.7; g.add(dome);
      const harmika=box(2,1.6,2,0xd9c26a); harmika.position.y=2.4+2+6*1.35; g.add(harmika);
      const spire=cone(0.6,3.6,0xd9c26a); spire.position.y=2.4+2+6*1.35+2.6; g.add(spire);
    } else if(n.includes("dargah")||n.includes("masjid")){
      const base = box(13,4.5,10,0xeef2ee); base.position.y=2.25; g.add(base);
      const dome = sph(3.4,0x3f8f6f); dome.position.y=4.5+2.6; g.add(dome);
      const finial3 = cone(0.3,1,0xd9c26a); finial3.position.y=4.5+6.6; g.add(finial3);
      [[5.5,4],[-5.5,4]].forEach(([x,z])=>{ const min=cyl(0.6,0.6,9,0xeef2ee); min.position.set(x,4.5+4.5,z); g.add(min);
        const cap=cone(0.7,1.4,0x3f8f6f); cap.position.set(x,4.5+9.7,z); g.add(cap); });
    } else {
      const base = box(5,2,5,0x9a9a9a); base.position.y=1; g.add(base);
      const shaft = box(2,10,2,0xbdbdbd); shaft.position.y=2+5; g.add(shaft);
      const top = cone(1.8,2.6,0xbdbdbd); top.position.y=2+10+1.3; g.add(top);
    }
    return g;
  }
  function highCourtBuilding(){
    const g = new THREE.Group();
    const base = box(16,4,10,0xefe6d0); base.position.y=2; g.add(base);
    for(let c=-6;c<=6;c+=2){ const col=cyl(0.35,0.35,4,0xffffff); col.position.set(c,2,5.2); g.add(col); }
    const pediment = box(16.5,1,10.5,0xd8c9a3); pediment.position.y=4.2; g.add(pediment);
    const tower = box(3,6,3,0xefe6d0); tower.position.set(0,4+3,0); g.add(tower);
    const spire = cone(1.5,2,0xd8c9a3); spire.position.set(0,4+6+1,0); g.add(spire);
    return g;
  }
  function treeMesh(){
    const g = new THREE.Group();
    const trunk = cyl(0.25,0.35,2,0x6b4a2f); trunk.position.y=1; g.add(trunk);
    const foliage = sph(1.4,0x3f7a3a); foliage.position.y=2.4; g.add(foliage);
    return g;
  }
  function streetLamp(){
    const g = new THREE.Group();
    const pole = cyl(0.14,0.18,6,0x2a2a2e); pole.position.y=3; g.add(pole);
    const arm = box(1.2,0.12,0.12,0x2a2a2e); arm.position.set(0.55,5.8,0); g.add(arm);
    const bulb = sph(0.28,0xffe9a8); bulb.material.emissive=new THREE.Color(0xffcf6b); bulb.material.emissiveIntensity=1.2; bulb.position.set(1.1,5.7,0); g.add(bulb);
    return g;
  }
  function parkedDecoCar(color){
    const g = new THREE.Group();
    const bd = box(2.9,0.85,5.6,color,0.4); bd.position.y=0.75; g.add(bd);
    const cab = box(2.2,0.75,2.6,0x22222a,0.4); cab.position.set(0,1.4,-0.3); g.add(cab);
    const wg = new THREE.CylinderGeometry(0.46,0.46,0.34,12);
    const wm = new THREE.MeshStandardMaterial({color:0x151515});
    [[1.3,0.46,1.9],[-1.3,0.46,1.9],[1.3,0.46,-1.9],[-1.3,0.46,-1.9]].forEach(([x,y,zp])=>{
      const w=new THREE.Mesh(wg,wm); w.rotation.z=Math.PI/2; w.position.set(x,y,zp); g.add(w);
    });
    return g;
  }
  function pedestrianDeco(){
    const shirtColors=[0xd94b4b,0x4bd97a,0xd9b84b,0x8a4bd9,0x4bb8d9,0xe07a3f];
    return buildHuman(shirtColors[Math.floor(Math.random()*shirtColors.length)]);
  }
  // roadside house — small residential building with a pitched roof, colour/size varied by seed
  function houseBuilding(seed){
    const g = new THREE.Group();
    const roofColors = [0xb5482f,0x7a4a2f,0x8a3b3b,0x5a5a75,0x9a5a2f];
    const wallColors = [0xe8d9b0,0xd9c9a3,0xcfd9c4,0xe0c8a0,0xc9d3e0,0xdcccb8];
    const wall = wallColors[seed%wallColors.length];
    const roofColor = roofColors[(seed+2)%roofColors.length];
    const w = 5+((seed*7)%4);
    const d = 5+((seed*5)%4);
    const h = 3+((seed*3)%2)*0.6;
    const base = box(w,h,d,wall); base.position.y=h/2; g.add(base);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w,d)*0.8,2.2,4), new THREE.MeshStandardMaterial({color:roofColor,roughness:0.75}));
    roof.rotation.y = Math.PI/4; roof.position.y = h+1.1; roof.castShadow=true; g.add(roof);
    const door = box(1,1.7,0.15,0x4a3222); door.position.set(0,0.85,d/2+0.05); g.add(door);
    const win1 = box(1,1,0.1,0x3a6ea5); win1.position.set(w/3,h*0.55,d/2+0.05); g.add(win1);
    const win2 = box(1,1,0.1,0x3a6ea5); win2.position.set(-w/3,h*0.55,d/2+0.05); g.add(win2);
    if(seed%3===0){ const boundary = box(w+1.5,0.6,0.15,0xb8ab8f); boundary.position.set(0,0.3,d/2+1.4); g.add(boundary); }
    return g;
  }

  // ---------- Place buildings / gardens per zone ----------
  const zoneGroup = new THREE.Group();
  ZONES.forEach((z,i)=>{
    const y0 = terrainHeight(z.x,z.z);
    const poi = POI[z.name];
    const items = [];
    if(poi){
      poi.h.forEach(()=>items.push('hotel'));
      poi.r.forEach(()=>items.push('restaurant'));
      poi.m.forEach(()=>items.push('mall'));
      items.push('police'); items.push('school');
    }
    items.push('landmark');
    const n = items.length;
    items.forEach((type,idx)=>{
      const ang = (idx/n)*Math.PI*2;
      const rad = 62;
      const bx = z.x + Math.cos(ang)*rad, bz = z.z + Math.sin(ang)*rad;
      const by = terrainHeight(bx,bz);
      let mesh;
      if(type==='hotel') mesh = hotelBuilding();
      else if(type==='mall') mesh = mallBuilding();
      else if(type==='restaurant') mesh = restaurantBuilding();
      else if(type==='police') mesh = policeBuilding();
      else if(type==='school') mesh = schoolBuilding();
      else mesh = landmarkBuilding(LANDMARK[z.name]||z.name);
      mesh.position.set(bx, by, bz);
      mesh.rotation.y = -ang;
      if(type==='landmark') mesh.scale.setScalar(1.6); // landmarks stand tallest/widest, like the real UP monuments they represent
      zoneGroup.add(mesh);

      // streetlamp + a parked deco car flanking each building for a lived-in city feel
      const lampAng = ang + 0.35;
      const lx = z.x + Math.cos(lampAng)*(rad-8), lz = z.z + Math.sin(lampAng)*(rad-8);
      const lamp = streetLamp(); lamp.position.set(lx, terrainHeight(lx,lz), lz); lamp.rotation.y = -ang;
      zoneGroup.add(lamp);

      if(Math.random()<0.6){
        const carAng = ang - 0.3;
        const cx = z.x + Math.cos(carAng)*(rad-10), cz = z.z + Math.sin(carAng)*(rad-10);
        const carColors=[0xd94b4b,0x3f6fb0,0xdedede,0x2a2a2e,0xffd166];
        const dc = parkedDecoCar(carColors[Math.floor(Math.random()*carColors.length)]);
        dc.position.set(cx, terrainHeight(cx,cz), cz); dc.rotation.y = ang + Math.PI/2 + (Math.random()*0.3-0.15);
        zoneGroup.add(dc);
      }
      if(Math.random()<0.45){
        const pAng = ang + 0.6;
        const px = z.x + Math.cos(pAng)*(rad-14), pz = z.z + Math.sin(pAng)*(rad-14);
        const ped = pedestrianDeco(); ped.position.set(px, terrainHeight(px,pz), pz); ped.rotation.y = Math.random()*Math.PI*2;
        zoneGroup.add(ped);
      }
    });
    // garden: bigger tree cluster spread further out to match the wider city footprint
    for(let t=0;t<10;t++){
      const ang = Math.random()*Math.PI*2, rad = 75+Math.random()*45;
      const tx=z.x+Math.cos(ang)*rad, tz=z.z+Math.sin(ang)*rad;
      const tree = treeMesh(); tree.position.set(tx, terrainHeight(tx,tz), tz);
      tree.scale.setScalar(0.9+Math.random()*0.8);
      zoneGroup.add(tree);
    }
    // flagpole (turf ownership indicator)
    const pole = cyl(0.15,0.15,6,0x888888); pole.position.set(z.x, y0+3, z.z); zoneGroup.add(pole);
    const flag = box(1.6,1,0.1, z.owner==='player'?0xffd166:0xcc4444); flag.position.set(z.x+0.9, y0+5.3, z.z);
    flag.userData.zoneIdx = i;
    zoneGroup.add(flag);
    z.flagMesh = flag;
  });
  scene.add(zoneGroup);

  // High Court at Allahabad
  const hcZone = ZONES.find(z=>z.name==="Allahabad");
  const hc = highCourtBuilding();
  hc.position.set(hcZone.x-120, terrainHeight(hcZone.x-120,hcZone.z), hcZone.z);
  scene.add(hc);

  // ---------- Roadside housing — line every highway and every local street with rows of homes ----------
  const roadsideGroup = new THREE.Group();
  let hseed = 0;
  ROAD_SEGMENTS.forEach(seg=>{
    const dx = seg.bx-seg.ax, dz = seg.bz-seg.az;
    const len = Math.hypot(dx,dz);
    if(len<1) return;
    const ux = dx/len, uz = dz/len;
    const nx = -uz, nz = ux; // perpendicular to the road, for setting houses back off the shoulder
    const gap = seg.type==='highway' ? 95 : 72;
    const setback = seg.type==='highway' ? 28 : 17;
    const steps = Math.min(16, Math.floor(len/gap));
    const skipChance = seg.type==='highway' ? 0.6 : 0.42;
    for(let s=1; s<steps; s++){
      const t = s/steps;
      const px = seg.ax + dx*t, pz = seg.az + dz*t;
      [-1,1].forEach(side=>{
        if(Math.random()<skipChance) return;
        const hx = px + nx*setback*side + (Math.random()*6-3);
        const hz = pz + nz*setback*side + (Math.random()*6-3);
        const gy = terrainHeight(hx,hz);
        if(gy<=-5) return; // keep inside the UP outline, skip anything that lands outside/underwater
        const nz2 = ZONES[nearestZone(hx,hz)];
        if(Math.hypot(hx-nz2.x, hz-nz2.z) < 52) return; // don't collide with the POI ring already built at each zone centre
        hseed++;
        const house = houseBuilding(hseed);
        house.position.set(hx, gy, hz);
        house.rotation.y = Math.atan2(dx,dz) + (side>0?0:Math.PI);
        roadsideGroup.add(house);
      });
    }
  });
  scene.add(roadsideGroup);

  // ---------- Human character ----------
  function buildHuman(shirtColor){
    const g = new THREE.Group();
    const legs = cyl(0.35,0.3,1.4,0x2b2b40); legs.position.y=0.7; g.add(legs);
    const torso = cyl(0.42,0.38,1.1,shirtColor||0x2f6fb0); torso.position.y=1.85; g.add(torso);
    const head = sph(0.32, 0xd9a875); head.position.y=2.65; g.add(head);
    const armL = cyl(0.13,0.13,1.0,shirtColor||0x2f6fb0); armL.position.set(0.55,1.9,0); armL.rotation.z=0.15; g.add(armL);
    const armR = cyl(0.13,0.13,1.0,shirtColor||0x2f6fb0); armR.position.set(-0.55,1.9,0); armR.rotation.z=-0.15; g.add(armR);
    g.traverse(m=>{ if(m.isMesh){ m.castShadow=true; } });
    return g;
  }
  const human = buildHuman(0x2f6fb0);
  scene.add(human);

  // ---------- Vehicles — one parked drivable car near the centre of every single zone ----------
  const CAR_COLORS = [0xffd166,0xd94b4b,0x3f6fb0,0xdedede,0x4bd97a,0xe07a3f,0x8a4bd9];
  function buildCarMesh(color){
    const g = new THREE.Group();
    const body = box(3.4,1,6.5,color,0.4); body.position.y=0.9; g.add(body);
    const cabin = box(2.6,0.9,3,0x2a2a35,0.4); cabin.position.set(0,1.65,-0.4); g.add(cabin);
    const wheelGeo = new THREE.CylinderGeometry(0.55,0.55,0.4,14);
    const wheelMat = new THREE.MeshStandardMaterial({color:0x1a1a1a});
    [[1.5,0.55,2.2],[-1.5,0.55,2.2],[1.5,0.55,-2.2],[-1.5,0.55,-2.2]].forEach(([x,y,zp])=>{
      const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z=Math.PI/2; w.position.set(x,y,zp); w.castShadow=true; g.add(w);
    });
    const headL = sph(0.18,0xfff2c9); headL.position.set(1.1,0.95,3.2); g.add(headL);
    const headR = sph(0.18,0xfff2c9); headR.position.set(-1.1,0.95,3.2); g.add(headR);
    return g;
  }
  const VEHICLES = [];
  ZONES.forEach((z,i)=>{
    // two spawn points per zone so a player is never far from a ride
    for(let v=0; v<2; v++){
      const ang = Math.random()*Math.PI*2, rad = 44+Math.random()*24;
      const vx = z.x + Math.cos(ang)*rad, vz = z.z + Math.sin(ang)*rad;
      const mesh = buildCarMesh(CAR_COLORS[(i*2+v)%CAR_COLORS.length]);
      mesh.position.set(vx, terrainHeight(vx,vz), vz);
      mesh.rotation.y = Math.random()*Math.PI*2;
      mesh.userData.parked = true;
      scene.add(mesh);
      VEHICLES.push(mesh);
    }
  });
  let activeCar = null; // the vehicle currently being driven, or null while on foot

  let mode = 'walk'; // 'walk' | 'drive'
  const player = {
    x: ZONES[homeIdx].x, z: ZONES[homeIdx].z, angle: Math.PI, speed:0,
    walkSpeed: 22, sprintSpeed: 44,
    maxSpeed:206, maxReverse:76, accel:151, brakePower:200, friction:89, turnRate:2.0,
    health:100, cash:2000
  };
  human.position.set(player.x, terrainHeight(player.x,player.z), player.z);

  // ---------- Joystick input ----------
  const joyBase = document.getElementById('joystickBase');
  const joyKnob = document.getElementById('joystickKnob');
  const joyState = { active:false, dx:0, dz:0 };
  let joyTouchId = null;
  function joyRect(){ return joyBase.getBoundingClientRect(); }
  function joyStart(clientX, clientY, id){
    joyState.active = true; joyTouchId = id;
  }
  function joyMove(clientX, clientY){
    if(!joyState.active) return;
    const r = joyRect();
    const cx = r.left+r.width/2, cy = r.top+r.height/2;
    let dx = clientX-cx, dy = clientY-cy;
    const maxR = r.width/2;
    const dist = Math.min(maxR, Math.hypot(dx,dy));
    const ang = Math.atan2(dy,dx);
    dx = Math.cos(ang)*dist; dy = Math.sin(ang)*dist;
    joyKnob.style.left = (55+dx)+'px'; joyKnob.style.top = (55+dy)+'px';
    joyState.dx = dx/maxR; joyState.dz = dy/maxR;
  }
  function joyEnd(){ joyState.active=false; joyState.dx=0; joyState.dz=0; joyKnob.style.left='50%'; joyKnob.style.top='50%'; }
  joyBase.addEventListener('touchstart', e=>{ e.preventDefault(); const t=e.changedTouches[0]; joyStart(t.clientX,t.clientY,t.identifier); joyMove(t.clientX,t.clientY); });
  joyBase.addEventListener('touchmove', e=>{ e.preventDefault(); for(const t of e.changedTouches){ if(t.identifier===joyTouchId) joyMove(t.clientX,t.clientY); } });
  window.addEventListener('touchend', e=>{ for(const t of e.changedTouches){ if(t.identifier===joyTouchId) joyEnd(); } });
  joyBase.addEventListener('mousedown', e=>{ joyStart(e.clientX,e.clientY,'mouse'); joyMove(e.clientX,e.clientY); });
  window.addEventListener('mousemove', e=>{ if(joyTouchId==='mouse') joyMove(e.clientX,e.clientY); });
  window.addEventListener('mouseup', ()=>{ if(joyTouchId==='mouse') joyEnd(); });

  const keys = {};
  window.addEventListener('keydown', e=>keys[e.key.toLowerCase()]=true);
  window.addEventListener('keyup', e=>keys[e.key.toLowerCase()]=false);

  let sprinting = false;
  const sprintBtn = document.getElementById('sprintBtn');
  const setSprint = v => e => { e.preventDefault(); sprinting = v; sprintBtn.classList.toggle('active', v); };
  sprintBtn.addEventListener('touchstart', setSprint(true));
  sprintBtn.addEventListener('touchend', setSprint(false));
  sprintBtn.addEventListener('mousedown', setSprint(true));
  sprintBtn.addEventListener('mouseup', setSprint(false));

  const ENTER_RADIUS = 15;
  function findNearestParkedVehicle(){
    let best=null, bd=Infinity;
    VEHICLES.forEach(v=>{
      if(!v.userData.parked) return;
      const d = Math.hypot(v.position.x-player.x, v.position.z-player.z);
      if(d<bd){ bd=d; best=v; }
    });
    return bd<=ENTER_RADIUS ? best : null;
  }
  const vehicleBtn = document.getElementById('vehicleBtn');
  const speedWrap = document.getElementById('speedWrap');
  vehicleBtn.addEventListener('click', ()=>{
    if(mode==='walk'){
      const target = findNearestParkedVehicle();
      if(!target) return;
      activeCar = target;
      activeCar.userData.parked = false;
      player.angle = activeCar.rotation.y;
      player.speed = 0;
      mode='drive';
      human.visible = false;
      vehicleBtn.textContent = 'Exit Vehicle';
      speedWrap.classList.add('show');
    } else {
      mode='walk';
      if(activeCar){
        activeCar.userData.parked = true;
        activeCar.position.set(player.x, terrainHeight(player.x,player.z), player.z);
        activeCar.rotation.y = player.angle;
      }
      activeCar = null;
      human.visible = true;
      human.position.set(player.x, terrainHeight(player.x,player.z), player.z);
      player.speed = 0;
      vehicleBtn.textContent = 'Enter Vehicle';
      speedWrap.classList.remove('show');
    }
  });

  let toastTimer=0;
  function showToast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('show'); toastTimer=1.8; }

  let wanted=0;
  const mini = document.getElementById('minimap');
  const mctx = mini.getContext('2d');
  function drawMinimap(){
    const cx = mini.width/2, cy = mini.height/2;
    const R = mini.width/2 - 3;
    const viewRadius = 950; // world units visible on the radar around the player
    const scale = R/viewRadius;
    mctx.clearRect(0,0,mini.width,mini.height);
    mctx.save();
    mctx.beginPath(); mctx.arc(cx,cy,R,0,Math.PI*2); mctx.clip();
    mctx.fillStyle = '#12081f'; mctx.fillRect(0,0,mini.width,mini.height);

    const toRadar = (wx,wz) => ({ x: cx + (wx-player.x)*scale, y: cy + (wz-player.z)*scale });

    // roads — grey "major roads" first, orange "national highways" drawn on top
    ['local','highway'].forEach(kind=>{
      ROAD_SEGMENTS.forEach(seg=>{
        if(seg.type!==kind) return;
        const a = toRadar(seg.ax,seg.az), b = toRadar(seg.bx,seg.bz);
        if(Math.max(Math.abs(a.x-cx),Math.abs(a.y-cy),Math.abs(b.x-cx),Math.abs(b.y-cy)) > R*1.5) return;
        mctx.strokeStyle = kind==='highway' ? 'rgba(255,178,60,0.95)' : 'rgba(190,190,200,0.55)';
        mctx.lineWidth = kind==='highway' ? 2.6 : 1.2;
        mctx.beginPath(); mctx.moveTo(a.x,a.y); mctx.lineTo(b.x,b.y); mctx.stroke();
      });
    });

    // rivers
    [[GANGA,'rgba(70,150,220,0.85)'],[YAMUNA,'rgba(70,190,180,0.85)']].forEach(([riv,color])=>{
      mctx.strokeStyle = color; mctx.lineWidth = 2.2;
      mctx.beginPath();
      riv.forEach((p,i)=>{ const r=toRadar(p.x,p.z); if(i===0) mctx.moveTo(r.x,r.y); else mctx.lineTo(r.x,r.y); });
      mctx.stroke();
    });

    // district blips
    ZONES.forEach(z=>{
      const d = Math.hypot(z.x-player.x, z.z-player.z);
      if(d>viewRadius*1.1) return;
      const r = toRadar(z.x,z.z);
      mctx.fillStyle = z.owner==='player' ? '#ffd166' : '#ff5566';
      mctx.beginPath(); mctx.arc(r.x,r.y,2.6,0,Math.PI*2); mctx.fill();
    });
    mctx.restore();

    // radar ring
    mctx.strokeStyle='rgba(255,209,102,0.9)'; mctx.lineWidth=2;
    mctx.beginPath(); mctx.arc(cx,cy,R,0,Math.PI*2); mctx.stroke();

    // player heading arrow, fixed at center like a GTA blip
    mctx.save();
    mctx.translate(cx,cy);
    mctx.rotate(-player.angle);
    mctx.fillStyle = mode==='drive' ? '#ff8844' : '#8ee3c8';
    mctx.beginPath();
    mctx.moveTo(0,-8); mctx.lineTo(6,7); mctx.lineTo(0,4); mctx.lineTo(-6,7);
    mctx.closePath(); mctx.fill();
    mctx.restore();
  }

  function updateHUD(){
    document.getElementById('healthBar').style.width = Math.max(0,player.health)+'%';
    document.getElementById('cashVal').textContent = '₹' + Math.floor(player.cash).toLocaleString('en-IN');
    const held = ZONES.filter(z=>z.owner==='player').length;
    document.getElementById('turfCount').textContent = `Turfs held: ${held} / ${ZONES.length}`;
    const near = ZONES.reduce((a,z)=>{ const d=(z.x-player.x)**2+(z.z-player.z)**2; return d<a.d?{d,z}:a; }, {d:Infinity,z:null});
    if(near.z) document.getElementById('posInfo').textContent = (mode==='drive'?"Driving in ":"Walking in ") + near.z.name;
    let s=''; for(let i=0;i<5;i++) s+= i<wanted?'★':'☆';
    document.getElementById('starsVal').textContent = s;
  }

  // ---------- Update loop ----------
  let running=false, lastTime=0;
  function update(dt){
    const kx = (keys['a']||keys['arrowleft']?-1:0) + (keys['d']||keys['arrowright']?1:0);
    const kz = (keys['w']||keys['arrowup']?-1:0) + (keys['s']||keys['arrowdown']?1:0);
    const inDx = joyState.dx || kx, inDz = joyState.dz || kz;
    const inputMag = Math.min(1, Math.hypot(inDx,inDz));

    if(mode==='walk'){
      let moving = false;
      if(inputMag>0.05){
        moving = true;
        const moveAngle = Math.atan2(inDx, inDz); // z forward/back, x left/right
        const spd = (sprinting?player.sprintSpeed:player.walkSpeed) * inputMag;
        player.x += Math.sin(moveAngle)*spd*dt;
        player.z += Math.cos(moveAngle)*spd*dt;
        player.angle = moveAngle + Math.PI;
      }
      player.x = Math.max(5, Math.min(WORLD_W-5, player.x));
      player.z = Math.max(5, Math.min(WORLD_H-5, player.z));
      const gy = terrainHeight(player.x,player.z);

      // GTA-style stride animation: bob the body and swing arms/legs while moving
      player.strideT = (player.strideT||0) + dt*(moving ? (sprinting?9:6) : 0);
      const bob = moving ? Math.abs(Math.sin(player.strideT))*0.12 : 0;
      human.position.set(player.x, gy+bob, player.z);
      human.rotation.y = player.angle;
      const swing = moving ? Math.sin(player.strideT)*0.6 : 0;
      if(human.children[3]) human.children[3].rotation.x = swing;   // left arm
      if(human.children[4]) human.children[4].rotation.x = -swing;  // right arm
      if(human.children[0]) human.children[0].rotation.x = 0; // legs stay a simple cylinder silhouette

      // vehicle proximity — check the whole garage, not just one fixed car
      const nearVehicle = findNearestParkedVehicle();
      vehicleBtn.classList.toggle('show', !!nearVehicle);
      if(nearVehicle) vehicleBtn.textContent = 'Enter Vehicle';

      const camDist=10, camHeight=5;
      const camX = player.x - Math.sin(player.angle-Math.PI)*camDist;
      const camZ = player.z - Math.cos(player.angle-Math.PI)*camDist;
      camera.position.lerp(new THREE.Vector3(camX, gy+camHeight, camZ), 0.15);
      camera.lookAt(player.x, gy+2, player.z);

    } else { // drive
      const up = inDz<-0.15 || keys['w']||keys['arrowup'];
      const down = inDz>0.15 || keys['s']||keys['arrowdown'];
      const left = inDx<-0.15 || keys['a']||keys['arrowleft'];
      const right = inDx>0.15 || keys['d']||keys['arrowright'];

      if(up) player.speed += player.accel*dt;
      else if(down) player.speed -= player.accel*dt;
      if(!up&&!down){ const f=player.friction*dt; if(player.speed>0) player.speed=Math.max(0,player.speed-f); else if(player.speed<0) player.speed=Math.min(0,player.speed+f); }
      player.speed = Math.max(-player.maxReverse, Math.min(player.maxSpeed, player.speed));
      // steering responds immediately even from a standstill, then gets stronger with speed — feels like a proper GTA controller
      const turnFactor = Math.min(1, 0.4 + Math.abs(player.speed)/50);
      if(left) player.angle += player.turnRate*dt*turnFactor*(player.speed<0?-1:1);
      if(right) player.angle -= player.turnRate*dt*turnFactor*(player.speed<0?-1:1);
      player.x += Math.sin(player.angle)*player.speed*dt;
      player.z += Math.cos(player.angle)*player.speed*dt;
      player.x = Math.max(5, Math.min(WORLD_W-5, player.x));
      player.z = Math.max(5, Math.min(WORLD_H-5, player.z));

      const groundY = terrainHeight(player.x,player.z);
      if(activeCar){
        activeCar.position.set(player.x, groundY+0.4, player.z);
        activeCar.rotation.y = player.angle;
      }

      vehicleBtn.classList.add('show');
      vehicleBtn.textContent = 'Exit Vehicle';
      document.getElementById('speedVal').textContent = Math.round(Math.abs(player.speed)*0.6);

      const camDist=16, camHeight=8;
      const camX = player.x - Math.sin(player.angle)*camDist;
      const camZ = player.z - Math.cos(player.angle)*camDist;
      camera.position.lerp(new THREE.Vector3(camX, groundY+camHeight, camZ), 0.12);
      camera.lookAt(player.x, groundY+2, player.z);
    }

    // turf capture (works in both modes)
    const curIdx = nearestZone(player.x,player.z);
    ZONES.forEach((z,i)=>{
      if(z.owner==='player') return;
      if(i===curIdx){
        z.progress = Math.min(1, z.progress+dt/7);
        if(z.progress>=1){
          z.owner='player'; player.cash+=700; wanted=Math.min(5,wanted+1);
          z.flagMesh.material.color.set(0xffd166);
          showToast(`🔥 ${z.name} captured!`);
        }
      } else { z.progress = Math.max(0, z.progress-dt/3.5); }
    });

    if(toastTimer>0){ toastTimer-=dt; if(toastTimer<=0) document.getElementById('toast').classList.remove('show'); }
    updateHUD();
    drawMinimap();
  }

  function loop(t){
    if(!running) return;
    const dt = Math.min(0.05,(t-lastTime)/1000);
    lastTime=t;
    update(dt);
    renderer.render(scene,camera);
    requestAnimationFrame(loop);
  }

  document.getElementById('loadingMsg').style.display='none';
  document.getElementById('startBtn').addEventListener('click', ()=>{
    document.getElementById('startOverlay').classList.add('hidden');
    running=true; lastTime=performance.now();
    requestAnimationFrame(loop);
  });

  // initial static render so scene is visible behind start overlay
  camera.position.set(player.x-124, 124, player.z+124);
  camera.lookAt(player.x, 0, player.z);
  renderer.render(scene,camera);
})();