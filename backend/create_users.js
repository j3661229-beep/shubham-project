const bcrypt = require('bcrypt');
const { User } = require('./src/models');

const createUsers = async () => {
  try {
    const roles = ['Admin', 'Supplier', 'Warehouse Manager', 'Retailer'];
    const password = await bcrypt.hash('password', 10);
    
    console.log('Creating users for each role...');

    for (const role of roles) {
      const email = `${role.toLowerCase().replace(' ', '_')}@gmail.com`;
      // Check if user exists first to prevent duplicates, or use findOrCreate
      await User.findOrCreate({
        where: { email },
        defaults: {
          name: `${role} User`,
          password: password,
          role: role
        }
      });
      console.log(`Created user: ${email} with role: ${role}`);
    }

    console.log('User creation complete!');
    process.exit(0);

  } catch (error) {
    console.error('Failed to create users:', error);
    process.exit(1);
  }
};

createUsers();
