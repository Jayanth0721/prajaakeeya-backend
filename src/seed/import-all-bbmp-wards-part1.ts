import { DataSource } from 'typeorm';
import { Ward } from '../wards/ward.entity';

const wardData = {
  central: {
    corp_id: 1,
    corp_name: 'Central',
    corp_name_l1: 'ಕೇಂದ್ರ',
    state: 'Karnataka',
    wards: [
      { ward_id: 1, ward_name: '1 - Ramaswamy Palya', ward_name_l1: '1 - ರಾಮಸ್ವಾಮಿ ಪಾಳ್ಯ' },
      { ward_id: 2, ward_name: '2 - Jayamahal', ward_name_l1: '2 - ಜಯಮಹಲ್' },
      { ward_id: 3, ward_name: '3 - Vasanth Nagar', ward_name_l1: '3 - ವಸಂತ್ ನಗರ' },
      { ward_id: 4, ward_name: '4 - Sampangirama Nagar', ward_name_l1: '4 - ಸಂಪಂಗಿರಾಮ ನಗರ' },
      { ward_id: 5, ward_name: '5 - Shivajinagar', ward_name_l1: '5 - ಶಿವಾಜಿನಗರ' },
      { ward_id: 6, ward_name: '6 - Bharathi Nagar', ward_name_l1: '6 -  ಭಾರತಿ ನಗರ' },
      { ward_id: 7, ward_name: '7 - K Kamaraj', ward_name_l1: '7 - ಕೆ. ಕಾಮರಾಜ್' },
      { ward_id: 8, ward_name: '8 - Halasuru', ward_name_l1: '8 - ಹಲಸುರು' },
      { ward_id: 9, ward_name: '9 - Hoysala Nagara Central', ward_name_l1: '9 - ಹೊಯ್ಸಳ ನಗರ ಸೆಂಟ್ರಲ್' },
      { ward_id: 10, ward_name: '10 - Cox Town', ward_name_l1: '10 - ಕಾಕ್ಸ್ ಟೌನ್' },
      { ward_id: 11, ward_name: '11 - Old Baiyappanahalli', ward_name_l1: '11 - ಓಲ್ಡ್ ಬೈಯ್ಯಪ್ಪನಹಳ್ಳಿ' },
      { ward_id: 12, ward_name: '12 - Kasturi Nagar', ward_name_l1: '12 - ಕಸ್ತೂರಿ ನಗರ' },
      { ward_id: 13, ward_name: '13 - Krishnaiahnapalya', ward_name_l1: '13 - ಕೃಷ್ಣಯ್ಯನಪಾಳ್ಯ' },
      { ward_id: 14, ward_name: '14 - Nagavarapalya', ward_name_l1: '14 - ನಾಗವರಪಾಳ್ಯ' },
      { ward_id: 15, ward_name: '15 - Indiranagar', ward_name_l1: '15 - ಇಂದಿರಾನಗರ' },
      { ward_id: 16, ward_name: '16 - New Thippasandra', ward_name_l1: '16 - ನ್ಯೂ ತಿಪ್ಪಸಂದ್ರ' },
      { ward_id: 17, ward_name: '17 - Kaggadasapura', ward_name_l1: '17 - ಕಗ್ಗದಾಸಪುರ' },
      { ward_id: 18, ward_name: '18 - G.M Palya', ward_name_l1: '18 - ಜಿ.ಎಂ. ಪಾಳ್ಯ' },
      { ward_id: 19, ward_name: '19 - Jeevan Bhimanagar', ward_name_l1: '19 - ಜೀವನ್ ಭೀಮನಗರ' },
      { ward_id: 20, ward_name: '20 - Kodihalli', ward_name_l1: '20 - ಕೋಡಿಹಳ್ಳಿ' },
      { ward_id: 21, ward_name: '21 - Konena Agrahara', ward_name_l1: '21 - ಕೋಣೆನ ಅಗ್ರಹಾರ' },
      { ward_id: 22, ward_name: '22 - Domluru', ward_name_l1: '22 - ದೊಮ್ಮಲೂರು' },
      { ward_id: 23, ward_name: '23 - Jogpalya', ward_name_l1: '23 - ಜೋಗಪಾಳ್ಯ' },
      { ward_id: 24, ward_name: '24 - Agaram', ward_name_l1: '24 - ಅಗರಂ' },
      { ward_id: 25, ward_name: '25 - Ashokanagar', ward_name_l1: '25 - ಅಶೋಕನಗರ' },
      { ward_id: 26, ward_name: '26 - Vannarpet', ward_name_l1: '26 - ವನ್ನಾರಪೇಟ್' },
      { ward_id: 27, ward_name: '27 - Ambedkarnagar', ward_name_l1: '27 - ಅಂಬೇಡ್ಕರ್‌ನಗರ' },
      { ward_id: 28, ward_name: '28 - Neelasandra', ward_name_l1: '28 - ನೀಲಸಂದ್ರ' },
      { ward_id: 29, ward_name: '29 - Austin Town', ward_name_l1: '29 - ಆಸ್ಟಿನ್ ಟೌನ್' },
      { ward_id: 30, ward_name: '30 - Vinayakanagar', ward_name_l1: '30 - ವಿನಾಯಕನಗರ' },
      { ward_id: 31, ward_name: '31 - Shanthinagar', ward_name_l1: '31 - ಶಾಂತಿನಗರ' },
      { ward_id: 32, ward_name: '32 - SilverJubliee Park ', ward_name_l1: '32 - ಸಿಲ್ವರ್ ಜುಬ್ಲಿ ಪಾರ್ಕ್' },
      { ward_id: 33, ward_name: '33 - Dharmaraya Swamy Temple ', ward_name_l1: '33 - ಧರ್ಮರಾಯ ಸ್ವಾಮಿ ದೇವಸ್ಥಾನ' },
      { ward_id: 34, ward_name: '34 - D.V Gundappa ', ward_name_l1: '34 - ಡಿ ವಿ ಗುಂಡಪ್ಪ' },
      { ward_id: 35, ward_name: '35 - Hombegowda Nagara', ward_name_l1: '35 - ಹೊಂಬೇಗೌಡ ನಗರ' },
      { ward_id: 36, ward_name: '36 - Someshwara Nagara', ward_name_l1: '36 - ಸೋಮೇಶ್ವರ ನಗರ' },
      { ward_id: 37, ward_name: '37 - BHEL ', ward_name_l1: '37 - ಬಿಎಚ್‌ಇಎಲ್' },
      { ward_id: 38, ward_name: '38 - Kanakanapalya', ward_name_l1: '38 - ಕನಕನಪಾಳ್ಯ' },
      { ward_id: 39, ward_name: '39 - Venkat Reddy Nagara', ward_name_l1: '39 - ವೆಂಕಟ್ ರೆಡ್ಡಿ ನಗರ' },
      { ward_id: 40, ward_name: '40 - Ashoka Pillar', ward_name_l1: '40 - ಅಶೋಕ ಸ್ತಂಭ' },
      { ward_id: 41, ward_name: '41 - V.V Puram', ward_name_l1: '41 - ವಿವಿ ಪುರಂ' },
      { ward_id: 42, ward_name: '42 - Sunkenahalli', ward_name_l1: '42 - ಸುಂಕೇನಹಳ್ಳಿ' },
      { ward_id: 43, ward_name: '43 - Devaraj Urs', ward_name_l1: '43 - ದೇವರಾಜ್ ಅರಸು' },
      { ward_id: 44, ward_name: '44 - Chamarajpet', ward_name_l1: '44 - ಚಾಮರಾಜಪೇಟೆ' },
      { ward_id: 45, ward_name: '45 - K.R Market', ward_name_l1: '45 - ಕೆಆರ್ ಮಾರುಕಟ್ಟೆ' },
      { ward_id: 46, ward_name: '46 - Cheluvadi Palya', ward_name_l1: '46 - ಚೆಲುವಾಡಿ ಪಾಳ್ಯ' },
      { ward_id: 47, ward_name: '47 - IPD Salappa ', ward_name_l1: '47 - ಐಪಿಡಿ ಸಾಲಪ್ಪ' },
      { ward_id: 48, ward_name: '48 - Azad Nagar', ward_name_l1: '48 - ಆಜಾದ್ ನಗರ' },
      { ward_id: 49, ward_name: '49 - Kasturbha Nagar', ward_name_l1: '49 - ಕಸ್ತೂರ್ಭಾ ನಗರ' },
      { ward_id: 50, ward_name: '50 - JJR Nagara', ward_name_l1: '50 - ಜೆಜೆಆರ್ ನಗರ' },
      { ward_id: 51, ward_name: '51 - Old Guddadahalli', ward_name_l1: '51 - ಹಳೆ ಗುಡ್ಡದಹಳ್ಳಿ' },
      { ward_id: 52, ward_name: '52 - Padarayanapura ', ward_name_l1: '52 - ಪಾದರಾಯನಪುರ' },
      { ward_id: 53, ward_name: '53 - Rayapuram', ward_name_l1: '53 - ರಾಯಪುರಂ' },
      { ward_id: 54, ward_name: '54 - Binnypete', ward_name_l1: '54 - ಬಿನ್ನಿಪೇಟೆ' },
      { ward_id: 55, ward_name: '55 - Bhuvaneshwari Nagar', ward_name_l1: '55 - ಭುವನೇಶ್ವರಿ ನಗರ' },
      { ward_id: 56, ward_name: '56 - Gopalpura', ward_name_l1: '56 - ಗೋಪಾಲಪುರ' },
      { ward_id: 57, ward_name: '57 - Cottonpete', ward_name_l1: '57 - ಕಾಟನ್ ಪೇಟೆ' },
      { ward_id: 58, ward_name: '58 - Chickpete', ward_name_l1: '58 - ಚಿಕ್ಕಪೇಟೆ' },
      { ward_id: 59, ward_name: '59 - Nehru Nagar', ward_name_l1: '59 - ನೆಹರು ನಗರ' },
      { ward_id: 60, ward_name: '60 - Seshadripuram', ward_name_l1: '60 - ಶೇಷಾದ್ರಿಪುರಂ' },
      { ward_id: 61, ward_name: '61 - Dattatreya ', ward_name_l1: '61 - ದತ್ತಾತ್ರೇಯ' },
      { ward_id: 62, ward_name: '62 - Swatantra Palya ', ward_name_l1: '62 - ಸ್ವತಂತ್ರ ಪಾಳ್ಯ' },
      { ward_id: 63, ward_name: '63 - Okalipuram', ward_name_l1: '63 - ಓಕಲಿಪುರಂ' },
    ],
  },
  east: {
    corp_id: 4,
    corp_name: 'East',
    corp_name_l1: 'ಪೂರ್ವ',
    state: 'Karnataka',
    wards: [
      { ward_id: 1, ward_name: '1 - K Narayanapura', ward_name_l1: '1 - ಕೆ. ನಾರಾಯಣಪುರ' },
      { ward_id: 2, ward_name: '2 - Horamavu agara', ward_name_l1: '2 - ಹೊರಮಾವು ಅಗರ' },
      { ward_id: 3, ward_name: '3 - Chellakere', ward_name_l1: '3 - ಚಳ್ಳಕೆರೆ' },
      { ward_id: 4, ward_name: '4 - Babusapalya', ward_name_l1: '4 - ಬಾಬೂಸಪಾಳ್ಯ' },
      { ward_id: 5, ward_name: '5 - Hoysala Nagara East', ward_name_l1: '5 - ಹೊಯ್ಸಳ ನಗರ ಪೂರ್ವ' },
      { ward_id: 6, ward_name: '6 - Kalkere', ward_name_l1: '6 - ಕಲ್ಕೆರೆ' },
      { ward_id: 7, ward_name: '7 - K Chennasandra', ward_name_l1: '7 - ಕೆ. ಚೆನ್ನಸಂದ್ರ' },
      { ward_id: 8, ward_name: '8 - Anandapura', ward_name_l1: '8 - ಆನಂದಪುರ' },
      { ward_id: 9, ward_name: '9 - Bhattarahalli', ward_name_l1: '9 - ಭಟ್ಟರಹಳ್ಳಿ' },
      { ward_id: 10, ward_name: '10 - Basavanapura', ward_name_l1: '10 - ಬಸವನಪುರ' },
      { ward_id: 11, ward_name: '11 - Krishna Nagar', ward_name_l1: '11 - ಕೃಷ್ಣನಗರ' },
      { ward_id: 12, ward_name: '12 - Devasandra', ward_name_l1: '12 - ದೇವಸಂದ್ರ' },
      { ward_id: 13, ward_name: '13 - Rajarajeshwari Temple ', ward_name_l1: '13 - ರಾಜರಾಜೇಶ್ವರಿ ದೇವಸ್ಥಾನ' },
      { ward_id: 14, ward_name: '14 - K.R Pura', ward_name_l1: '14 - ಕೆ.ಆರ್.ಪುರ' },
      { ward_id: 15, ward_name: '15 - Ramamurthy Nagara', ward_name_l1: '15 - ರಾಮಮೂರ್ತಿ ನಗರ' },
      { ward_id: 16, ward_name: '16 - Kotthur', ward_name_l1: '16 - ಕೊತ್ತೂರು' },
      { ward_id: 17, ward_name: '17 - Vijinapura', ward_name_l1: '17 - ವಿಜಿನಾಪುರ' },
      { ward_id: 18, ward_name: '18 - Dooravaninagar', ward_name_l1: '18 - ದೂರವಾಣಿ ನಗರ' },
      { ward_id: 19, ward_name: '19 - K.S. Nissar Ahmed ', ward_name_l1: '19 - ಕೆ.ಎಸ್. ನಿಸಾರ್ ಅಹ್ಮದ್ ' },
      { ward_id: 20, ward_name: '20 - A Narayanapura', ward_name_l1: '20 - ಎ. ನಾರಾಯಣಪುರ' },
      { ward_id: 21, ward_name: '21 - Uday Nagar', ward_name_l1: '21 - ಉದಯ್ ನಗರ' },
      { ward_id: 22, ward_name: '22 - Mahadevapura', ward_name_l1: '22 - ಮಹಾದೇವಪುರ' },
      { ward_id: 23, ward_name: '23 - Sangama ', ward_name_l1: '23 - ಸಂಗಮ' },
      { ward_id: 24, ward_name: '24 - Vignananagara', ward_name_l1: '24 - ವಿಜ್ಞಾನನಗರ' },
      { ward_id: 25, ward_name: '25 - L.B Shastri Nagar', ward_name_l1: '25 - ಎಲ್.ಬಿ. ಶಾಸ್ತ್ರಿ ನಗರ' },
      { ward_id: 26, ward_name: '26 - Jagadish Nagar', ward_name_l1: '26 - ಜಗದೀಶನಗರ' },
      { ward_id: 27, ward_name: '27 - Vibhootipura', ward_name_l1: '27 - ವಿಭೂತಿಪುರ' },
      { ward_id: 28, ward_name: '28 - Byrathi', ward_name_l1: '28 - ಬೈರತಿ' },
      { ward_id: 29, ward_name: '29 - Hoodi', ward_name_l1: '29 - ಹೂಡಿ' },
      { ward_id: 30, ward_name: '30 - Belathur', ward_name_l1: '30 - ಬೆಳತೂರ್' },
      { ward_id: 31, ward_name: '31 - Kadugodi', ward_name_l1: '31 - ಕಾಡುಗೋಡಿ' },
      { ward_id: 32, ward_name: '32 - Channasandra', ward_name_l1: '32 - ಚನ್ನಸಂದ್ರ' },
      { ward_id: 33, ward_name: '33 - S.M Krishna ', ward_name_l1: '33 - ಎಸ್.ಎಂ. ಕೃಷ್ಣ' },
      { ward_id: 34, ward_name: '34 - Kaveri Nagara', ward_name_l1: '34 - ಕಾವೇರಿ ನಗರ' },
      { ward_id: 35, ward_name: '35 - Garudachar Palya', ward_name_l1: '35 - ಗರುಡಾಚಾರ್ ಪಾಳ್ಯ' },
      { ward_id: 36, ward_name: '36 - Bharath Aikya ', ward_name_l1: '36 - ಭಾರತ್ ಐಕ್ಯ' },
      { ward_id: 37, ward_name: '37 - Kundalahalli', ward_name_l1: '37 - ಕುಂದಲಹಳ್ಳಿ' },
      { ward_id: 38, ward_name: '38 - Whitefield', ward_name_l1: '38 - ವೈಟ್‌ಫೀಲ್ಡ್' },
      { ward_id: 39, ward_name: '39 - Hagaduru', ward_name_l1: '39 - ಹಗದೂರು' },
      { ward_id: 40, ward_name: '40 - Varthur', ward_name_l1: '40 - ವರ್ತೂರು' },
      { ward_id: 41, ward_name: '41 - Munnenkolalu', ward_name_l1: '41 - ಮುನ್ನೇಕೊಳಲು' },
      { ward_id: 42, ward_name: '42 - Priyadarshini ', ward_name_l1: '42 - ಪ್ರಿಯದರ್ಶಿನಿ' },
      { ward_id: 43, ward_name: '43 - Dodda Nekkundi', ward_name_l1: '43 - ದೊಡ್ಡ ನೆಕ್ಕುಂಡಿ' },
      { ward_id: 44, ward_name: '44 - Ashwath Nagar', ward_name_l1: '44 - ಅಶ್ವತ್ ನಗರ' },
      { ward_id: 45, ward_name: '45 - Marathahalli', ward_name_l1: '45 - ಮಾರತಹಳ್ಳಿ' },
      { ward_id: 46, ward_name: '46 - Yamalur', ward_name_l1: '46 - ಯಮಲೂರು' },
      { ward_id: 47, ward_name: '47 - Bellanduru', ward_name_l1: '47 - ಬೆಳ್ಳಂದೂರು' },
      { ward_id: 48, ward_name: '48 - Panathur', ward_name_l1: '48 - ಪಣತ್ತೂರು' },
      { ward_id: 49, ward_name: '49 - Doddakannelli ', ward_name_l1: '49 - ದೊಡ್ಡಕನ್ನೆಲ್ಲಿ' },
      { ward_id: 50, ward_name: '50 - Gunjur', ward_name_l1: '50 - ಗುಂಜೂರು' },
    ],
  },
  // Will be truncated for file length - continuing in part 2...
};

// Helper function to strip "X - " prefix from ward names
const stripPrefix = (name: string): string => {
  return name.replace(/^\d+\s*-\s*/, '').trim();
};

async function importAllWards() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Ward],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('✓ Database connected\n');

  const wardRepo = dataSource.getRepository(Ward);

  // Delete all existing wards for fresh import
  console.log('Deleting existing wards...');
  await wardRepo.delete({});
  console.log('✓ Existing wards deleted\n');

  let totalImported = 0;

  // Import Central wards
  console.log(`Importing ${wardData.central.corp_name} wards...`);
  for (const ward of wardData.central.wards) {
    const cleanName = stripPrefix(ward.ward_name);
    const newWard = wardRepo.create({
      number: `C-${ward.ward_id}`,
      name: cleanName,
      zone: wardData.central.corp_name,
      state: wardData.central.state,
      assembly: 'TBD',
      parliamentary: 'TBD',
    });
    await wardRepo.save(newWard);
    totalImported++;
  }
  console.log(`✓ Imported ${wardData.central.wards.length} Central wards\n`);

  // Import East wards
  console.log(`Importing ${wardData.east.corp_name} wards...`);
  for (const ward of wardData.east.wards) {
    const cleanName = stripPrefix(ward.ward_name);
    const newWard = wardRepo.create({
      number: `E-${ward.ward_id}`,
      name: cleanName,
      zone: wardData.east.corp_name,
      state: wardData.east.state,
      assembly: 'TBD',
      parliamentary: 'TBD',
    });
    await wardRepo.save(newWard);
    totalImported++;
  }
  console.log(`✓ Imported ${wardData.east.wards.length} East wards\n`);

  console.log(`\n🎉 Total wards imported: ${totalImported}`);
  await dataSource.destroy();
}

importAllWards().catch(console.error);
