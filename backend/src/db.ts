import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/konyvtar');
    console.log('✅ Sikeres kapcsolódás a MongoDB-hez');
  } catch (err) {
    console.error('❌ Hiba a MongoDB kapcsolat során:', err);
    process.exit(1);
  }
};

export default connectToDatabase;