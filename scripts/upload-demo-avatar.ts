import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const BUCKET = process.env.AWS_S3_BUCKET_NAME || 'prajaakeeya';
const REGION = process.env.AWS_REGION || 'ap-south-1';
const KEY = 'demo/demo-aspirant-avatar.jpg';

async function upload() {
  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });

  const filePath = path.resolve(__dirname, 'demo-aspirant-avatar.jpg');
  if (!fs.existsSync(filePath)) {
    console.error(`Place the demo avatar image at: ${filePath}`);
    process.exit(1);
  }

  const body = fs.readFileSync(filePath);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: KEY,
    Body: body,
    ContentType: 'image/jpeg',
  }));

  console.log(`Uploaded: https://${BUCKET}.s3.${REGION}.amazonaws.com/${KEY}`);
}

upload().catch(err => { console.error(err); process.exit(1); });
