const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const saltRounds = 10
const hashPassword = async(password) => {
    return await bcrypt.hash(password, saltRounds)
}


const users = [
    {
        email: 'ryan01@gmail.com',
        username: 'ryan01',
        password: 'abc123',
        role: 'USER'
    }
]

const categories = [
    {
        name: 'Shirt'
    },
    {
        name: 'T-Shirt'
    },
    {
        name: 'Jacket'
    }
]

const products = [
    {
        name: 'Distort Black',
        price: 95000,
        stocks: 50,
        categoryId: 2
    },
    {
        name: 'Cosmic Fun Based Orange',
        price: 85000,
        stocks: 30,
        categoryId: 2
    },
    {
        name: 'Champ Kart White',
        price: 85000,
        stocks: 30,
        categoryId: 2
    },
    {
        name: 'Boundless Height White',
        price: 105000,
        stocks: 30,
        categoryId: 2
    },
    {
        name: 'Based College Navy',
        price: 285000,
        stocks: 30,
        categoryId: 3
    },
    {
        name: 'Vuoton Black',
        price: 255000,
        stocks: 50,
        categoryId: 3
    },
    {
        name: 'Scraper Army',
        price: 355000,
        stocks: 10,
        categoryId: 3
    }
]

async function main(){
    categories.forEach(async(item) => {
        await prisma.category.create({
            data: item
        })
    })

    users.forEach(async(item) => {
        await prisma.user.create({
            data: {
                ...item, 
                password: await hashPassword(item.password)
            }
        })
    })

    products.forEach(async(item) => {
        await prisma.product.create({
            data: item
        })
    })
}

main().catch((error) => {
    console.log(error)
}).finally(async() => {
    await prisma.$disconnect()
})