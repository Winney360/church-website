import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    
    // Create default admin user if it doesn't exist
    await createDefaultAdmin();
    
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const createDefaultAdmin = async () => {
  try {
    // Import User model dynamically to avoid circular dependency
    const { default: User } = await import('../models/User.js');
    
    // Check if admin exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = new User({
        name: process.env.ADMIN_NAME || 'System Administrator',
        email: process.env.ADMIN_EMAIL || 'admin@gracechurch.com',
        password: process.env.ADMIN_PASSWORD || 'Admin123!',
        role: 'admin',
        isEmailVerified: true,
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created');
      console.log(`📧 Admin Email: ${adminUser.email}`);
      console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin123!'}`);
      console.log('⚠️  Please change the admin password after first login!');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

export default connectDB;