import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'b110411f-e925-4259-8846-aa791d9700da',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs apaixonados por tecnologia',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log('Database seeded')
  prisma.$disconnect
})