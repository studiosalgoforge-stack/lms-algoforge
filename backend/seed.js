import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import Question from './models/Question.js';

await connectDB();
await Question.deleteMany({});
const cats = ['General Question', 'Interview Questions', 'Doubt Questions', 'Badges'];

const docs = Array.from({ length: 20 }).map((_, i) => ({
  title: `Power BI assignment help #${i + 1}`,
  body: `Unable to understand which dataset to use. Please guide me as soon as possible. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.`,
  category: cats[i % cats.length],
  tags: ['power-bi', 'assignment']
}));
await Question.insertMany(docs);
console.log('Seeded');
process.exit(0);
