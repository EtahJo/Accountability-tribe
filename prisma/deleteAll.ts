const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    await prisma.$transaction([
      prisma.like.deleteMany(),
      prisma.comment.deleteMany(),
      prisma.post.deleteMany(),
      prisma.user.deleteMany(),
    ]);
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData();
