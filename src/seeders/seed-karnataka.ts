import { DataSource } from "typeorm";
import { State } from "../geography/state.entity";
import { Parliamentary } from "../geography/parliamentary.entity";
import { Assembly } from "../geography/assembly.entity";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const parliamentaryData = [
  "Bagalkot",
  "Bangalore Central",
  "Bangalore North",
  "Bangalore Rural",
  "Bangalore South",
  "Belgaum",
  "Bellary",
  "Bidar",
  "Bijapur",
  "Chamarajanagar",
  "Chikkballapur",
  "Chikkodi",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gulbarga",
  "Hassan",
  "Haveri",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysore",
  "Raichur",
  "Shimoga",
  "Tumkur",
  "Udupi Chikmagalur",
  "Uttara Kannada",
];

const assemblyData = [
  {
    parliamentary: "Bagalkot",
    assemblies:
      "Mudhol; Terdal; Jamkhandi; Bilgi; Badami; Bagalkot; Hungund; Nargund",
  },
  {
    parliamentary: "Bangalore Central",
    assemblies:
      "Sarvagnanagar; C. V. Raman Nagar; Shivajinagar; Shanti Nagar; Gandhi Nagar; Rajaji Nagar; Chamrajpet; Mahadevapura",
  },
  {
    parliamentary: "Bangalore North",
    assemblies:
      "K. R. Pura; Byatarayanapura; Yeshvanthapura; Dasarahalli; Mahalakshmi Layout; Malleshwaram; Hebbal; Pulakeshinagar",
  },
  {
    parliamentary: "Bangalore Rural",
    assemblies:
      "Kunigal; Rajarajeshwarinagar; Bangalore South; Anekal; Magadi; Ramanagaram; Kanakapura; Channapatna",
  },
  {
    parliamentary: "Bangalore South",
    assemblies:
      "Govindraj Nagar; Vijay Nagar; Chickpet; Basavanagudi; Padmanaba Nagar; B. T. M. Layout; Jayanagar; Bommanahalli",
  },
  {
    parliamentary: "Belgaum",
    assemblies:
      "Arabhavi; Gokak; Belgaum Uttar; Belgaum Dakshin; Belgaum Rural; Bailhongal; Saundatti Yellamma; Ramdurg",
  },
  {
    parliamentary: "Bellary",
    assemblies:
      "Hadagalli; Hagaribommanahalli; Vijayanagara; Kampli; Bellary; Bellary City; Sandur; Kudligi",
  },
  {
    parliamentary: "Bidar",
    assemblies:
      "Chincholi; Aland; Basavakalyan; Humnabad; Bidar South; Bidar; Bhalki; Aurad",
  },
  {
    parliamentary: "Bijapur",
    assemblies:
      "Muddebihal; Devar Hippargi; Basavana Bagevadi; Babaleshwar; Bijapur City; Nagthan; Indi; Sindgi",
  },
  {
    parliamentary: "Chamarajanagar",
    assemblies:
      "Heggadadevankote; Nanjangud; Varuna; T. Narasipur; Hanur; Kollegal; Chamarajanagar; Gundlupet",
  },
  {
    parliamentary: "Chikkballapur",
    assemblies:
      "Gauribidanur; Bagepalli; Chikkballapur; Yelahanka; Hosakote; Devanahalli; Doddaballapur; Nelamangala",
  },
  {
    parliamentary: "Chikkodi",
    assemblies:
      "Nippani; Chikkodi-Sadalga; Athani; Kagwad; Kudachi; Raybag; Hukkeri; Yemkanmardi",
  },
  {
    parliamentary: "Chitradurga",
    assemblies:
      "Molakalmuru; Challakere; Chitradurga; Hiriyur; Hosadurga; Holalkere; Sira; Pavagada",
  },
  {
    parliamentary: "Dakshina Kannada",
    assemblies:
      "Belthangady; Moodabidri; Mangalore City North; Mangalore City South; Mangalore; Bantval; Puttur; Sullia",
  },
  {
    parliamentary: "Davanagere",
    assemblies:
      "Jagalur; Harapanahalli; Harihar; Davanagere North; Davanagere South; Mayakonda; Channagiri; Honnali",
  },
  {
    parliamentary: "Dharwad",
    assemblies:
      "Navalgund; Kundgol; Dharwad; Hubli-Dharwad East; Hubli-Dharwad Central; Hubli-Dharwad West; Kalghatgi; Shiggaon",
  },
  {
    parliamentary: "Gulbarga",
    assemblies:
      "Afzalpur; Jevargi; Gurmitkal; Chittapur; Sedam; Gulbarga Rural; Gulbarga Dakshin; Gulbarga Uttar",
  },
  {
    parliamentary: "Hassan",
    assemblies:
      "Kadur; Shravanabelagola; Arsikere; Belur; Hassan; Holenarasipur; Arkalgud; Sakleshpur",
  },
  {
    parliamentary: "Haveri",
    assemblies:
      "Shirahatti; Ron; Gadag; Hangal; Haveri; Byadgi; Hirekerur; Ranibennur",
  },
  {
    parliamentary: "Kolar",
    assemblies:
      "Sidlaghatta; Srinivaspura; Mulbagal; Kolar Gold Field; Bangarapet; Kolar; Malur; Chintamani",
  },
  {
    parliamentary: "Koppal",
    assemblies:
      "Sindhanur; Maski; Kushtagi; Kanakagiri; Gangawati; Yelburga; Koppal; Siruguppa",
  },
  {
    parliamentary: "Mandya",
    assemblies:
      "Malavalli; Maddur; Melukote; Mandya; Shrirangapattana; Nagamangala; Krishnarajpet; Krishnarajanagara",
  },
  {
    parliamentary: "Mysore",
    assemblies:
      "Madikeri; Virajpet; Piriyapatna; Hunsur; Chamundeshwari; Krishnaraja; Chamaraja; Narasimharaja",
  },
  {
    parliamentary: "Raichur",
    assemblies:
      "Shorapur; Shahapur; Yadgir; Raichur Rural; Raichur; Manvi; Devadurga; Lingasugur",
  },
  {
    parliamentary: "Shimoga",
    assemblies:
      "Shimoga Rural; Bhadravati; Shimoga; Tirthahalli; Shikaripura; Sorab; Sagar; Byndoor",
  },
  {
    parliamentary: "Tumkur",
    assemblies:
      "Chiknayakanhalli; Tiptur; Turuvekere; Tumkur City; Tumkur Rural; Koratagere; Gubbi; Madhugiri",
  },
  {
    parliamentary: "Udupi Chikmagalur",
    assemblies:
      "Kundapura; Udupi; Kapu; Karkal; Sringeri; Mudigere; Chikmagalur; Tarikere",
  },
  {
    parliamentary: "Uttara Kannada",
    assemblies:
      "Khanapur; Kittur; Haliyal; Karwar; Kumta; Bhatkal; Sirsi; Yellapur",
  },
];

async function seed() {
  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [State, Parliamentary, Assembly],
  });

  await dataSource.initialize();
  console.log("Database connected");

  const stateRepo = dataSource.getRepository(State);
  const parliamentaryRepo = dataSource.getRepository(Parliamentary);
  const assemblyRepo = dataSource.getRepository(Assembly);

  // Create Karnataka state
  let karnataka = await stateRepo.findOne({ where: { name: "Karnataka" } });
  if (!karnataka) {
    karnataka = stateRepo.create({ name: "Karnataka", code: "KA" });
    await stateRepo.save(karnataka);
    console.log("✓ Created state: Karnataka");
  } else {
    console.log("✓ State Karnataka already exists");
  }

  // Create Parliamentary constituencies
  const existingPC = await parliamentaryRepo.find({
    where: { state: "Karnataka" },
  });
  const existingPCNames = new Set(existingPC.map((pc) => pc.name));

  const newPCs = parliamentaryData
    .filter((name) => !existingPCNames.has(name))
    .map((name) => parliamentaryRepo.create({ name, state: "Karnataka" }));

  if (newPCs.length > 0) {
    await parliamentaryRepo.save(newPCs);
    console.log(`✓ Created ${newPCs.length} parliamentary constituencies`);
  } else {
    console.log("✓ All parliamentary constituencies already exist");
  }

  // Create Assembly constituencies
  const allAssemblies: Array<{
    name: string;
    state: string;
    parliamentary: string;
  }> = [];

  for (const item of assemblyData) {
    const assemblyList = item.assemblies.split(";").map((a) => a.trim());
    for (const assembly of assemblyList) {
      allAssemblies.push({
        name: assembly,
        state: "Karnataka",
        parliamentary: item.parliamentary,
      });
    }
  }

  const existingAC = await assemblyRepo.find({ where: { state: "Karnataka" } });
  const existingACNames = new Set(existingAC.map((ac) => ac.name));

  const newACs = allAssemblies
    .filter((ac) => !existingACNames.has(ac.name))
    .map((ac) => assemblyRepo.create(ac));

  if (newACs.length > 0) {
    await assemblyRepo.save(newACs);
    console.log(`✓ Created ${newACs.length} assembly constituencies`);
  } else {
    console.log("✓ All assembly constituencies already exist");
  }

  console.log("\n✓ Seeding completed successfully!");
  await dataSource.destroy();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
