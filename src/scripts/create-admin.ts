import 'dotenv/config';
import minimist from 'minimist';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

const args = minimist(process.argv.slice(2));
if (!args.email) {
  console.error('Please provide an email address with --email');
  process.exit(1);
}
if (!args.firstName) {
  console.error('Please provide a first name with --firstName');
  process.exit(1);
}
if (!args.lastName) {
  console.error('Please provide a last name with --lastName');
  process.exit(1);
}
if (!args.password) {
  console.error('Please provide a password with --password');
  process.exit(1);
}

async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    throw new Error('Email already exists');
  }

  console.log('Creating User with data: ', {
    email,
    firstName,
    lastName,
    password,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
      role: 'ADMIN',
    },
  });

  console.log('Done!');
}

createUser(args.email, args.firstName, args.lastName, String(args.password));
