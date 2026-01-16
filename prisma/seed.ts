import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Admin User
  console.log('Creating admin user...')
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'david2020524@gmail.com' },
    update: {},
    create: {
      email: 'david2020524@gmail.com',
      username: 'admin',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      is_producer: true,
      is_verified: true,
      email_verified: true,
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create Test Producer User
  console.log('Creating test producer...')
  const producer = await prisma.user.upsert({
    where: { email: 'producer@musichub.com' },
    update: {},
    create: {
      email: 'producer@musichub.com',
      username: 'testproducer',
      name: 'Test Producer',
      password: hashedPassword,
      role: 'USER',
      is_producer: true,
      is_verified: true,
      email_verified: true,
    },
  })
  console.log('✅ Test producer created:', producer.email)

  // Create Test User (Listener)
  console.log('Creating test listener...')
  const listener = await prisma.user.upsert({
    where: { email: 'user@musichub.com' },
    update: {},
    create: {
      email: 'user@musichub.com',
      username: 'testuser',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
      is_producer: false,
      is_verified: true,
      email_verified: true,
    },
  })
  console.log('✅ Test listener created:', listener.email)

  // Create Wallets for Producer and Admin
  console.log('Creating wallets...')
  await prisma.wallet.upsert({
    where: { user_id: admin.id },
    update: {},
    create: {
      user_id: admin.id,
      available_balance: 0,
      pending_balance: 0,
      lifetime_earnings: 0,
    },
  })

  await prisma.wallet.upsert({
    where: { user_id: producer.id },
    update: {},
    create: {
      user_id: producer.id,
      available_balance: 0,
      pending_balance: 0,
      lifetime_earnings: 0,
    },
  })
  console.log('✅ Wallets created')

  // Create Forum Categories
  console.log('Creating forum categories...')
  const categories = [
    {
      name: 'General Discussion',
      slug: 'general-discussion',
      description: 'Talk about anything music-related',
      icon: 'fas fa-comments',
      order: 1,
    },
    {
      name: 'Production Tips',
      slug: 'production-tips',
      description: 'Share and learn music production techniques',
      icon: 'fas fa-headphones',
      order: 2,
    },
    {
      name: 'Industry News',
      slug: 'industry-news',
      description: 'Latest news from the music industry',
      icon: 'fas fa-newspaper',
      order: 3,
    },
    {
      name: 'Collaboration',
      slug: 'collaboration',
      description: 'Find collaborators and work together',
      icon: 'fas fa-users',
      order: 4,
    },
  ]

  for (const category of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log('✅ Forum categories created')

  // Create Sample Tracks
  console.log('Creating sample tracks...')
  const tracks = [
    {
      user_id: producer.id,
      title: 'Summer Vibes',
      description: 'A chill summer track perfect for relaxation',
      genre: 'Electronic',
      tags: ['chill', 'summer', 'relax'],
      price: 24.99,
      license_type: 'PERSONAL',
      audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      cover_url: 'https://via.placeholder.com/500x500/9333EA/ffffff?text=Summer+Vibes',
      duration: 180,
      bitrate: 320,
      sample_rate: 44100,
      file_size: 8600000,
      status: 'PUBLISHED',
    },
    {
      user_id: producer.id,
      title: 'Urban Beats',
      description: 'Hard-hitting urban beats for your next project',
      genre: 'Hip Hop',
      tags: ['urban', 'beats', 'hard'],
      price: 29.99,
      license_type: 'COMMERCIAL',
      audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      cover_url: 'https://via.placeholder.com/500x500/EC4899/ffffff?text=Urban+Beats',
      duration: 200,
      bitrate: 320,
      sample_rate: 44100,
      file_size: 9500000,
      status: 'PUBLISHED',
    },
    {
      user_id: admin.id,
      title: 'Midnight Jazz',
      description: 'Smooth jazz for late night vibes',
      genre: 'Jazz',
      tags: ['jazz', 'smooth', 'night'],
      price: 19.99,
      license_type: 'PERSONAL',
      audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover_url: 'https://via.placeholder.com/500x500/3B82F6/ffffff?text=Midnight+Jazz',
      duration: 240,
      bitrate: 320,
      sample_rate: 48000,
      file_size: 11400000,
      status: 'PUBLISHED',
    },
  ]

  for (const track of tracks) {
    await prisma.track.create({
      data: track,
    })
  }
  console.log('✅ Sample tracks created')

  // Create a Sample Forum Topic
  console.log('Creating sample forum topic...')
  const generalCategory = await prisma.forumCategory.findUnique({
    where: { slug: 'general-discussion' },
  })

  if (generalCategory) {
    await prisma.forumTopic.create({
      data: {
        category_id: generalCategory.id,
        user_id: admin.id,
        title: 'Welcome to MUSICAL Forum!',
        slug: 'welcome-to-musichub-forum',
        content: 'Welcome to the MUSICAL community! This is a place to discuss music, share tips, and connect with other producers and music lovers. Feel free to introduce yourself!',
        is_pinned: true,
      },
    })
  }
  console.log('✅ Sample forum topic created')

  // Create Sample Blog Post
  console.log('Creating sample blog post...')
  await prisma.blogPost.create({
    data: {
      author_id: admin.id,
      title: 'Welcome to MUSICAL',
      slug: 'welcome-to-musichub',
      content: `
# Welcome to MUSICAL

We're excited to launch MUSICAL, the premier platform for buying and selling music tracks in Turkey!

## What is MUSICAL?

MUSICAL is a marketplace where:
- **Producers** can upload and sell their music
- **Buyers** can discover and purchase high-quality tracks
- **Everyone** can connect in our community forum

## Getting Started

1. **Sign up** for a free account
2. **Browse** our catalog of amazing tracks
3. **Purchase** tracks you love
4. **Join** the discussion in our forum

## For Producers

Want to sell your music? Apply to become a verified producer:
1. Complete the producer application
2. Submit your KYC documents
3. Get approved by our team
4. Start uploading and selling!

Thank you for being part of our community!
      `,
      excerpt: 'Welcome to MUSICAL - the premier platform for buying and selling music tracks in Turkey!',
      published: true,
      published_at: new Date(),
    },
  })
  console.log('✅ Sample blog post created')

  console.log('🎉 Database seed completed!')
  console.log('')
  console.log('Test Accounts:')
  console.log('==============')
  console.log('Admin:')
  console.log('  Email: david2020524@gmail.com')
  console.log('  Password: password123')
  console.log('')
  console.log('Producer:')
  console.log('  Email: producer@musichub.com')
  console.log('  Password: password123')
  console.log('')
  console.log('Listener:')
  console.log('  Email: user@musichub.com')
  console.log('  Password: password123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
