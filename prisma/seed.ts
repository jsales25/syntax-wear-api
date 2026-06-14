import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const products = [
    {
      name: 'Camiseta Syntax Hoodie',
      slug: 'camiseta-syntax-hoodie',
      description: 'Moletom confortável com estampa minimalista.',
      price: 159.90,
      colors: ['Preto', 'Cinza'],
      sizes: ['P', 'M', 'G', 'GG'],
      stock: 50,
      images: ['https://placehold.co/600x400?text=Syntax+Hoodie']
    },
    {
      name: 'Camiseta Binary Tee',
      slug: 'camiseta-binary-tee',
      description: 'Camiseta 100% algodão com estampa em código binário.',
      price: 79.90,
      colors: ['Branco', 'Azul'],
      sizes: ['P', 'M', 'G'],
      stock: 100,
      images: ['https://placehold.co/600x400?text=Binary+Tee']
    },
    {
      name: 'Boné C++',
      slug: 'bone-cpp',
      description: 'Boné aba curva com bordado C++ de alta qualidade.',
      price: 59.90,
      colors: ['Preto'],
      sizes: ['Único'],
      stock: 30,
      images: ['https://placehold.co/600x400?text=CPP+Cap']
    },
    {
      name: 'Meias Debugging',
      slug: 'meias-debugging',
      description: 'Meias divertidas para os dias de debug intenso.',
      price: 29.90,
      colors: ['Amarelo', 'Verde'],
      sizes: ['Único'],
      stock: 200,
      images: ['https://placehold.co/600x400?text=Debugging+Socks']
    },
    {
      name: 'Jaqueta Fullstack',
      slug: 'jaqueta-fullstack',
      description: 'Jaqueta corta-vento para programadores versáteis.',
      price: 249.90,
      colors: ['Marinho'],
      sizes: ['M', 'G', 'GG'],
      stock: 25,
      images: ['https://placehold.co/600x400?text=Fullstack+Jacket']
    },
    {
      name: 'Beanie Git Commit',
      slug: 'beanie-git-commit',
      description: 'Gorro confortável para aquecer suas ideias.',
      price: 45.00,
      colors: ['Cinza Escuro'],
      sizes: ['Único'],
      stock: 40,
      images: ['https://placehold.co/600x400?text=Git+Beanie']
    },
    {
      name: 'Camiseta Hello World',
      slug: 'camiseta-hello-world',
      description: 'A clássica camiseta para todo iniciante.',
      price: 69.90,
      colors: ['Branco', 'Preto'],
      sizes: ['P', 'M', 'G', 'GG'],
      stock: 80,
      images: ['https://placehold.co/600x400?text=Hello+World']
    },
    {
      name: 'Calça Javascript Joggers',
      slug: 'calca-javascript-joggers',
      description: 'Calça estilo jogger com detalhes em amarelo.',
      price: 129.90,
      colors: ['Preto'],
      sizes: ['P', 'M', 'G'],
      stock: 35,
      images: ['https://placehold.co/600x400?text=JS+Joggers']
    },
    {
      name: 'Polo Python',
      slug: 'polo-python',
      description: 'Camisa polo elegante com logo discreto.',
      price: 99.90,
      colors: ['Azul Escuro', 'Verde'],
      sizes: ['M', 'G'],
      stock: 45,
      images: ['https://placehold.co/600x400?text=Python+Polo']
    },
    {
      name: 'Shorts SQL',
      slug: 'shorts-sql',
      description: 'Shorts leve para consultas rápidas ao banco de dados.',
      price: 55.00,
      colors: ['Cinza'],
      sizes: ['P', 'M', 'G'],
      stock: 60,
      images: ['https://placehold.co/600x400?text=SQL+Shorts']
    }
  ]

  console.log('Iniciando o seed...')

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        price: product.price
      }
    })
  }

  console.log('Seed finalizado com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    await pool.end()
    process.exit(1)
  })
