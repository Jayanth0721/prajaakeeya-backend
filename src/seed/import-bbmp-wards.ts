import { DataSource } from "typeorm";
import { Ward } from "../wards/ward.entity";

const wardData = {
  central: {
    corp_id: 1,
    corp_name: "Central",
    corp_name_l1: "ಕೇಂದ್ರ",
    state: "Karnataka",
    wards: [
      {
        ward_id: 1,
        ward_name: "Ramaswamy Palya",
        ward_name_l1: "ರಾಮಸ್ವಾಮಿ ಪಾಳ್ಯ",
      },
      { ward_id: 2, ward_name: "Jayamahal", ward_name_l1: "ಜಯಮಹಲ್" },
      { ward_id: 3, ward_name: "Vasanth Nagar", ward_name_l1: "ವಸಂತ್ ನಗರ" },
      {
        ward_id: 4,
        ward_name: "Sampangirama Nagar",
        ward_name_l1: "ಸಂಪಂಗಿರಾಮ ನಗರ",
      },
      { ward_id: 5, ward_name: "Shivajinagar", ward_name_l1: "ಶಿವಾಜಿನಗರ" },
      { ward_id: 6, ward_name: "Bharathi Nagar", ward_name_l1: "ಭಾರತಿ ನಗರ" },
      { ward_id: 7, ward_name: "K Kamaraj", ward_name_l1: "ಕೆ. ಕಾಮರಾಜ್" },
      { ward_id: 8, ward_name: "Halasuru", ward_name_l1: "ಹಲಸುರು" },
      {
        ward_id: 9,
        ward_name: "Hoysala Nagara Central",
        ward_name_l1: "ಹೊಯ್ಸಳ ನಗರ ಸೆಂಟ್ರಲ್",
      },
      { ward_id: 10, ward_name: "Cox Town", ward_name_l1: "ಕಾಕ್ಸ್ ಟೌನ್" },
      {
        ward_id: 11,
        ward_name: "Old Baiyappanahalli",
        ward_name_l1: "ಓಲ್ಡ್ ಬೈಯ್ಯಪ್ಪನಹಳ್ಳಿ",
      },
      { ward_id: 12, ward_name: "Kasturi Nagar", ward_name_l1: "ಕಸ್ತೂರಿ ನಗರ" },
      {
        ward_id: 13,
        ward_name: "Krishnaiahnapalya",
        ward_name_l1: "ಕೃಷ್ಣಯ್ಯನಪಾಳ್ಯ",
      },
      { ward_id: 14, ward_name: "Nagavarapalya", ward_name_l1: "ನಾಗವರಪಾಳ್ಯ" },
      { ward_id: 15, ward_name: "Indiranagar", ward_name_l1: "ಇಂದಿರಾನಗರ" },
      {
        ward_id: 16,
        ward_name: "New Thippasandra",
        ward_name_l1: "ನ್ಯೂ ತಿಪ್ಪಸಂದ್ರ",
      },
      { ward_id: 17, ward_name: "Kaggadasapura", ward_name_l1: "ಕಗ್ಗದಾಸಪುರ" },
      { ward_id: 18, ward_name: "G.M Palya", ward_name_l1: "ಜಿ.ಎಂ. ಪಾಳ್ಯ" },
      {
        ward_id: 19,
        ward_name: "Jeevan Bhimanagar",
        ward_name_l1: "ಜೀವನ್ ಭೀಮನಗರ",
      },
      { ward_id: 20, ward_name: "Kodihalli", ward_name_l1: "ಕೋಡಿಹಳ್ಳಿ" },
      {
        ward_id: 21,
        ward_name: "Konena Agrahara",
        ward_name_l1: "ಕೋಣೆನ ಅಗ್ರಹಾರ",
      },
      { ward_id: 22, ward_name: "Domluru", ward_name_l1: "ದೊಮ್ಮಲೂರು" },
      { ward_id: 23, ward_name: "Jogpalya", ward_name_l1: "ಜೋಗಪಾಳ್ಯ" },
      { ward_id: 24, ward_name: "Agaram", ward_name_l1: "ಅಗರಂ" },
      { ward_id: 25, ward_name: "Ashokanagar", ward_name_l1: "ಅಶೋಕನಗರ" },
      { ward_id: 26, ward_name: "Vannarpet", ward_name_l1: "ವನ್ನಾರಪೇಟ್" },
      {
        ward_id: 27,
        ward_name: "Ambedkarnagar",
        ward_name_l1: "ಅಂಬೇಡ್ಕರ್‌ನಗರ",
      },
      { ward_id: 28, ward_name: "Neelasandra", ward_name_l1: "ನೀಲಸಂದ್ರ" },
      { ward_id: 29, ward_name: "Austin Town", ward_name_l1: "ಆಸ್ಟಿನ್ ಟೌನ್" },
      { ward_id: 30, ward_name: "Vinayakanagar", ward_name_l1: "ವಿನಾಯಕನಗರ" },
      { ward_id: 31, ward_name: "Shanthinagar", ward_name_l1: "ಶಾಂತಿನಗರ" },
      {
        ward_id: 32,
        ward_name: "SilverJubliee Park",
        ward_name_l1: "ಸಿಲ್ವರ್ ಜುಬ್ಲಿ ಪಾರ್ಕ್",
      },
      {
        ward_id: 33,
        ward_name: "Dharmaraya Swamy Temple",
        ward_name_l1: "ಧರ್ಮರಾಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ",
      },
      { ward_id: 34, ward_name: "D.V Gundappa", ward_name_l1: "ಡಿ ವಿ ಗುಂಡಪ್ಪ" },
      {
        ward_id: 35,
        ward_name: "Hombegowda Nagara",
        ward_name_l1: "ಹೊಂಬೇಗೌಡ ನಗರ",
      },
      {
        ward_id: 36,
        ward_name: "Someshwara Nagara",
        ward_name_l1: "ಸೋಮೇಶ್ವರ ನಗರ",
      },
      { ward_id: 37, ward_name: "BHEL", ward_name_l1: "ಬಿಎಚ್‌ಇಎಲ್" },
      { ward_id: 38, ward_name: "Kanakanapalya", ward_name_l1: "ಕನಕನಪಾಳ್ಯ" },
      {
        ward_id: 39,
        ward_name: "Venkat Reddy Nagara",
        ward_name_l1: "ವೆಂಕಟ್ ರೆಡ್ಡಿ ನಗರ",
      },
      { ward_id: 40, ward_name: "Ashoka Pillar", ward_name_l1: "ಅಶೋಕ ಸ್ತಂಭ" },
      { ward_id: 41, ward_name: "V.V Puram", ward_name_l1: "ವಿವಿ ಪುರಂ" },
      { ward_id: 42, ward_name: "Sunkenahalli", ward_name_l1: "ಸುಂಕೇನಹಳ್ಳಿ" },
      { ward_id: 43, ward_name: "Devaraj Urs", ward_name_l1: "ದೇವರಾಜ್ ಅರಸು" },
      { ward_id: 44, ward_name: "Chamarajpet", ward_name_l1: "ಚಾಮರಾಜಪೇಟೆ" },
      { ward_id: 45, ward_name: "K.R Market", ward_name_l1: "ಕೆಆರ್ ಮಾರುಕಟ್ಟೆ" },
      {
        ward_id: 46,
        ward_name: "Cheluvadi Palya",
        ward_name_l1: "ಚೆಲುವಾಡಿ ಪಾಳ್ಯ",
      },
      { ward_id: 47, ward_name: "IPD Salappa", ward_name_l1: "ಐಪಿಡಿ ಸಾಲಪ್ಪ" },
      { ward_id: 48, ward_name: "Azad Nagar", ward_name_l1: "ಆಜಾದ್ ನಗರ" },
      {
        ward_id: 49,
        ward_name: "Kasturbha Nagar",
        ward_name_l1: "ಕಸ್ತೂರ್ಭಾ ನಗರ",
      },
      { ward_id: 50, ward_name: "JJR Nagara", ward_name_l1: "ಜೆಜೆಆರ್ ನಗರ" },
      {
        ward_id: 51,
        ward_name: "Old Guddadahalli",
        ward_name_l1: "ಹಳೆ ಗುಡ್ಡದಹಳ್ಳಿ",
      },
      { ward_id: 52, ward_name: "Padarayanapura", ward_name_l1: "ಪಾದರಾಯನಪುರ" },
      { ward_id: 53, ward_name: "Rayapuram", ward_name_l1: "ರಾಯಪುರಂ" },
      { ward_id: 54, ward_name: "Binnypete", ward_name_l1: "ಬಿನ್ನಿಪೇಟೆ" },
      {
        ward_id: 55,
        ward_name: "Bhuvaneshwari Nagar",
        ward_name_l1: "ಭುವನೇಶ್ವರಿ ನಗರ",
      },
      { ward_id: 56, ward_name: "Gopalpura", ward_name_l1: "ಗೋಪಾಲಪುರ" },
      { ward_id: 57, ward_name: "Cottonpete", ward_name_l1: "ಕಾಟನ್ ಪೇಟೆ" },
      { ward_id: 58, ward_name: "Chickpete", ward_name_l1: "ಚಿಕ್ಕಪೇಟೆ" },
      { ward_id: 59, ward_name: "Nehru Nagar", ward_name_l1: "ನೆಹರು ನಗರ" },
      { ward_id: 60, ward_name: "Seshadripuram", ward_name_l1: "ಶೇಷಾದ್ರಿಪುರಂ" },
      { ward_id: 61, ward_name: "Dattatreya", ward_name_l1: "ದತ್ತಾತ್ರೇಯ" },
      {
        ward_id: 62,
        ward_name: "Swatantra Palya",
        ward_name_l1: "ಸ್ವತಂತ್ರ ಪಾಳ್ಯ",
      },
      { ward_id: 63, ward_name: "Okalipuram", ward_name_l1: "ಓಕಲಿಪುರಂ" },
    ],
  },
  east: {
    corp_id: 4,
    corp_name: "East",
    corp_name_l1: "ಪೂರ್ವ",
    state: "Karnataka",
    wards: [
      {
        ward_id: 1,
        ward_name: "K Narayanapura",
        ward_name_l1: "ಕೆ. ನಾರಾಯಣಪುರ",
      },
      { ward_id: 2, ward_name: "Horamavu agara", ward_name_l1: "ಹೊರಮಾವು ಅಗರ" },
      { ward_id: 3, ward_name: "Chellakere", ward_name_l1: "ಚಳ್ಳಕೆರೆ" },
      { ward_id: 4, ward_name: "Babusapalya", ward_name_l1: "ಬಾಬೂಸಪಾಳ್ಯ" },
      {
        ward_id: 5,
        ward_name: "Hoysala Nagara East",
        ward_name_l1: "ಹೊಯ್ಸಳ ನಗರ ಪೂರ್ವ",
      },
      { ward_id: 6, ward_name: "Kalkere", ward_name_l1: "ಕಲ್ಕೆರೆ" },
      {
        ward_id: 7,
        ward_name: "K Chennasandra",
        ward_name_l1: "ಕೆ. ಚೆನ್ನಸಂದ್ರ",
      },
      { ward_id: 8, ward_name: "Anandapura", ward_name_l1: "ಆನಂದಪುರ" },
      { ward_id: 9, ward_name: "Bhattarahalli", ward_name_l1: "ಭಟ್ಟರಹಳ್ಳಿ" },
      { ward_id: 10, ward_name: "Basavanapura", ward_name_l1: "ಬಸವನಪುರ" },
      { ward_id: 11, ward_name: "Krishna Nagar", ward_name_l1: "ಕೃಷ್ಣನಗರ" },
      { ward_id: 12, ward_name: "Devasandra", ward_name_l1: "ದೇವಸಂದ್ರ" },
      {
        ward_id: 13,
        ward_name: "Rajarajeshwari Temple",
        ward_name_l1: "ರಾಜರಾಜೇಶ್ವರಿ ದೇವಸ್ಥಾನ",
      },
      { ward_id: 14, ward_name: "K.R Pura", ward_name_l1: "ಕೆ.ಆರ್.ಪುರ" },
      {
        ward_id: 15,
        ward_name: "Ramamurthy Nagara",
        ward_name_l1: "ರಾಮಮೂರ್ತಿ ನಗರ",
      },
      { ward_id: 16, ward_name: "Kotthur", ward_name_l1: "ಕೊತ್ತೂರು" },
      { ward_id: 17, ward_name: "Vijinapura", ward_name_l1: "ವಿಜಿನಾಪುರ" },
      { ward_id: 18, ward_name: "Dooravaninagar", ward_name_l1: "ದೂರವಾಣಿ ನಗರ" },
      {
        ward_id: 19,
        ward_name: "K.S. Nissar Ahmed",
        ward_name_l1: "ಕೆ.ಎಸ್. ನಿಸಾರ್ ಅಹ್ಮದ್ ",
      },
      {
        ward_id: 20,
        ward_name: "A Narayanapura",
        ward_name_l1: "ಎ. ನಾರಾಯಣಪುರ",
      },
      { ward_id: 21, ward_name: "Uday Nagar", ward_name_l1: "ಉದಯ್ ನಗರ" },
      { ward_id: 22, ward_name: "Mahadevapura", ward_name_l1: "ಮಹಾದೇವಪುರ" },
      { ward_id: 23, ward_name: "Sangama", ward_name_l1: "ಸಂಗಮ" },
      { ward_id: 24, ward_name: "Vignananagara", ward_name_l1: "ವಿಜ್ಞಾನನಗರ" },
      {
        ward_id: 25,
        ward_name: "L.B Shastri Nagar",
        ward_name_l1: "ಎಲ್.ಬಿ. ಶಾಸ್ತ್ರಿ ನಗರ",
      },
      { ward_id: 26, ward_name: "Jagadish Nagar", ward_name_l1: "ಜಗದೀಶನಗರ" },
      { ward_id: 27, ward_name: "Vibhootipura", ward_name_l1: "ವಿಭೂತಿಪುರ" },
      { ward_id: 28, ward_name: "Byrathi", ward_name_l1: "ಬೈರತಿ" },
      { ward_id: 29, ward_name: "Hoodi", ward_name_l1: "ಹೂಡಿ" },
      { ward_id: 30, ward_name: "Belathur", ward_name_l1: "ಬೆಳತೂರ್" },
      { ward_id: 31, ward_name: "Kadugodi", ward_name_l1: "ಕಾಡುಗೋಡಿ" },
      { ward_id: 32, ward_name: "Channasandra", ward_name_l1: "ಚನ್ನಸಂದ್ರ" },
      { ward_id: 33, ward_name: "S.M Krishna", ward_name_l1: "ಎಸ್.ಎಂ. ಕೃಷ್ಣ" },
      { ward_id: 34, ward_name: "Kaveri Nagara", ward_name_l1: "ಕಾವೇರಿ ನಗರ" },
      {
        ward_id: 35,
        ward_name: "Garudachar Palya",
        ward_name_l1: "ಗರುಡಾಚಾರ್ ಪಾಳ್ಯ",
      },
      { ward_id: 36, ward_name: "Bharath Aikya", ward_name_l1: "ಭಾರತ್ ಐಕ್ಯ" },
      { ward_id: 37, ward_name: "Kundalahalli", ward_name_l1: "ಕುಂದಲಹಳ್ಳಿ" },
      { ward_id: 38, ward_name: "Whitefield", ward_name_l1: "ವೈಟ್‌ಫೀಲ್ಡ್" },
      { ward_id: 39, ward_name: "Hagaduru", ward_name_l1: "ಹಗದೂರು" },
      { ward_id: 40, ward_name: "Varthur", ward_name_l1: "ವರ್ತೂರು" },
      { ward_id: 41, ward_name: "Munnenkolalu", ward_name_l1: "ಮುನ್ನೇಕೊಳಲು" },
      { ward_id: 42, ward_name: "Priyadarshini", ward_name_l1: "ಪ್ರಿಯದರ್ಶಿನಿ" },
      {
        ward_id: 43,
        ward_name: "Dodda Nekkundi",
        ward_name_l1: "ದೊಡ್ಡ ನೆಕ್ಕುಂಡಿ",
      },
      { ward_id: 44, ward_name: "Ashwath Nagar", ward_name_l1: "ಅಶ್ವತ್ ನಗರ" },
      { ward_id: 45, ward_name: "Marathahalli", ward_name_l1: "ಮಾರತಹಳ್ಳಿ" },
      { ward_id: 46, ward_name: "Yamalur", ward_name_l1: "ಯಮಲೂರು" },
      { ward_id: 47, ward_name: "Bellanduru", ward_name_l1: "ಬೆಳ್ಳಂದೂರು" },
      { ward_id: 48, ward_name: "Panathur", ward_name_l1: "ಪಣತ್ತೂರು" },
      {
        ward_id: 49,
        ward_name: "Doddakannelli",
        ward_name_l1: "ದೊಡ್ಡಕನ್ನೆಲ್ಲಿ",
      },
      { ward_id: 50, ward_name: "Gunjur", ward_name_l1: "ಗುಂಜೂರು" },
    ],
  },
  // Continue with other corporations...
};

async function importWards() {
  const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Ward],
    synchronize: false,
  });

  await dataSource.initialize();
  const wardRepo = dataSource.getRepository(Ward);

  console.log("Starting ward import...\n");

  // Import Central corporation wards
  for (const ward of wardData.central.wards) {
    const existing = await wardRepo.findOne({
      where: { number: ward.ward_id.toString() },
    });
    if (existing) {
      console.log(`Updating ward ${ward.ward_id}: ${ward.ward_name}`);
      existing.name = ward.ward_name;
      existing.zone = wardData.central.corp_name;
      existing.state = wardData.central.state;
      existing.assembly = "TBD"; // Update with actual assembly data
      await wardRepo.save(existing);
    } else {
      console.log(`Creating ward ${ward.ward_id}: ${ward.ward_name}`);
      const newWard = wardRepo.create({
        number: ward.ward_id.toString(),
        name: ward.ward_name,
        zone: wardData.central.corp_name,
        state: wardData.central.state,
        assembly: "TBD", // Update with actual assembly data
        parliamentary: "TBD", // Update with actual data
      });
      await wardRepo.save(newWard);
    }
  }

  // Import East corporation wards
  for (const ward of wardData.east.wards) {
    const wardNumber = `E-${ward.ward_id}`; // Prefix with E for East
    const existing = await wardRepo.findOne({ where: { number: wardNumber } });
    if (existing) {
      console.log(`Updating ward ${wardNumber}: ${ward.ward_name}`);
      existing.name = ward.ward_name;
      existing.zone = wardData.east.corp_name;
      existing.state = wardData.east.state;
      existing.assembly = "TBD";
      await wardRepo.save(existing);
    } else {
      console.log(`Creating ward ${wardNumber}: ${ward.ward_name}`);
      const newWard = wardRepo.create({
        number: wardNumber,
        name: ward.ward_name,
        zone: wardData.east.corp_name,
        state: wardData.east.state,
        assembly: "TBD",
        parliamentary: "TBD",
      });
      await wardRepo.save(newWard);
    }
  }

  console.log("\nWard import complete!");
  await dataSource.destroy();
}

importWards().catch(console.error);
