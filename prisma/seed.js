const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  [
    "Jane Doe",
    "janedoe01",
    "Female",
    "janedoe01@gmail.com",
    "United States",
    "A contemporary artist known for vibrant landscapes.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/743e25fd-1de6-42aa-bf12-82a5ba5d0634.jpg",
  ],
  [
    "John Doe",
    "johndoe02",
    "Male",
    "johndoe02@gmail.com",
    "Canada",
    "An abstract artist with a unique perspective on modern art.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/b03bd57f-f634-4eef-987e-405e8c8de596.jpg",
  ],
  [
    "Alice Green",
    "alicegreen03",
    "Female",
    "alicegreen03@gmail.com",
    "United States",
    "A digital artist exploring the boundaries of virtual reality.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/ae050c3c-176c-48cd-a0bc-cdc8ba9edd93.jpg",
  ],
  [
    "Michael Brown",
    "michaelbrown04",
    "Male",
    "michaelbrown04@gmail.com",
    "United States",
    "A sculptor whose works are featured in many public spaces.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/25a02440-730f-4011-b192-aaeb40f89f89.jpg",
  ],
  [
    "Emma Wilson",
    "emmawilson05",
    "Female",
    "emmawilson05@gmail.com",
    "Mexico",
    "A watercolor artist known for her serene and calming pieces.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/78565cbe-187f-4eaa-a120-2bb8a61cf1e2.jpeg",
  ],
  [
    "John Smith",
    "johnsmith06",
    "Male",
    "johnsmith06@gmail.com",
    "United States",
    "A mixed media artist with a focus on urban landscapes.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/d1043505-15d5-411c-aad6-32606e760b75.jpg",
  ],
  [
    "Emily Johnson",
    "emilyjohnson07",
    "Female",
    "emilyjohnson07@gmail.com",
    "Canada",
    "An illustrator and graphic designer.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/9586bcb5-95a2-44c4-acaf-13034b237701.jpg",
  ],
  [
    "Anna White",
    "annawhite08",
    "Female",
    "annawhite08@gmail.com",
    "Mexico",
    "A minimalist painter known for her geometric designs.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/879a452a-2c1a-4611-845f-859341d5e6a2.jpg",
  ],
  [
    "Mark Brown",
    "markbrown09",
    "Male",
    "markbrown09@gmail.com",
    "Canada",
    "A photographer capturing the essence of city life.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/7a2a7cdc-7961-4325-bbe5-3de422035a53.jpg",
  ],
  [
    "Rachel Moore",
    "rachelmoore10",
    "Female",
    "rachelmoore10@gmail.com",
    "United States",
    "A printmaker with a passion for botanical subjects.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artist/bcc944b9-f32e-459d-b1b8-bfb1f05d3873.jpg",
  ],
];
const artPieces = [
  [
    "Sunset Over the Mountains",
    1,
    2021,
    "Oil on Canvas",
    "A beautiful depiction of a sunset over the mountains, capturing the vibrant colors of the evening sky.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artpiece/1b13a729-df36-4757-a690-43a05012f072.jpeg",
    "Modern Art Gallery",
    "New York",
    "USA",
    5000,
    null,
    0,
  ],
  [
    "Morning Bliss",
    2,
    2019,
    "Watercolor on Paper",
    "A serene morning scene with soft hues and delicate brushwork.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artpiece/d47ceefb-92b6-44e3-9d84-abc04cd4a219.jpeg",
    "Art Lovers Gallery",
    "Los Angeles",
    "USA",
    3000,
    null,
    0,
  ],
  [
    "City Lights",
    3,
    2020,
    "Acrylic on Canvas",
    "A dynamic representation of a bustling city at night, illuminated by vibrant lights.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artpiece/d1782dea-71d1-4891-8aa4-82b736450172.jpeg",
    "Urban Art Space",
    "Chicago",
    "USA",
    4500,
    null,
    0,
  ],
  [
    "Autumn Leaves",
    4,
    2018,
    "Oil on Canvas",
    "A warm and vibrant depiction of autumn leaves in a forest setting.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artpiece/67479772-bc74-4a4c-a328-c7fdd7a9c66b.jpeg",
    "Nature Art Gallery",
    "Seattle",
    "USA",
    3500,
    null,
    0,
  ],
  [
    "Ocean Waves",
    5,
    2022,
    "Acrylic on Canvas",
    "A powerful and dramatic portrayal of ocean waves crashing against the shore.",
    "https://files.edgestore.dev/aerf8ik4hbz52apm/myPublicImages/_public/artpiece/29d929c0-d61f-4861-9cd6-8119593a76ef.jpeg",
    "Coastal Art Gallery",
    "San Francisco",
    "USA",
    4000,
    null,
    0,
  ],
];
const reviews = [
  ["Sunset Over the Mountains", 6, 4.0, "Absolutely stunning piece of art!"],
  [
    "Sunset Over the Mountains",
    7,
    5.0,
    "The colors are so vibrant and the details are exquisite.",
  ],
  ["Morning Bliss", 8, 3.0, "Very calming and beautifully executed."],
  ["Morning Bliss", 9, 4.0, "The use of color is exceptional."],
  ["City Lights", 6, 5.0, "Incredible detail and energy!"],
  ["City Lights", 1, 2.0, "Feels like you are in the middle of the city."],
  ["Autumn Leaves", 2, 4.0, "The colors are so rich and beautiful."],
  ["Autumn Leaves", 10, 5.0, "Really captures the essence of autumn."],
  ["Ocean Waves", 7, 2.0, "You can almost hear the waves!"],
  ["Ocean Waves", 10, 4.0, "The movement and energy are fantastic."],
];
const tags = [
  ["Sunset Over the Mountains", "sunset"],
  ["Sunset Over the Mountains", "mountains"],
  ["Sunset Over the Mountains", "oil painting"],
  ["Sunset Over the Mountains", "nature"],
  ["Morning Bliss", "morning"],
  ["Morning Bliss", "watercolor"],
  ["Morning Bliss", "landscape"],
  ["Morning Bliss", "serene"],
  ["City Lights", "city"],
  ["City Lights", "night"],
  ["City Lights", "acrylic"],
  ["City Lights", "urban"],
  ["Autumn Leaves", "autumn"],
  ["Autumn Leaves", "leaves"],
  ["Autumn Leaves", "oil painting"],
  ["Autumn Leaves", "forest"],
  ["Ocean Waves", "ocean"],
  ["Ocean Waves", "waves"],
  ["Ocean Waves", "acrylic"],
  ["Ocean Waves", "seascape"],
];

async function main() {
  // Seed users
  for (const user of users) {
    const [name, username, gender, email, country, bio, photoUrl] = user;
    await prisma.user.create({
      data: {
        name,
        username,
        gender,
        email,
        country,
        bio,
        photoUrl,
      },
    });
  }

  // Seed art pieces
  for (const artPiece of artPieces) {
    const [
      title,
      artistId,
      yearCreated,
      medium,
      description,
      imageUrl,
      gallery,
      city,
      country,
      price,
      paymentStatus,
    ] = artPiece;
    await prisma.artPiece.create({
      data: {
        title,
        artistId,
        yearCreated,
        medium,
        description,
        imageUrl,
        gallery,
        city,
        country,
        price,
        paymentStatus,
      },
    });
  }

  // Seed reviews
  for (const review of reviews) {
    const [artTitle, userId, rating, comment] = review;
    await prisma.review.create({
      data: {
        artTitle,
        userId,
        rating,
        comment,
      },
    });
  }

  // Seed tags
  for (const tag of tags) {
    const [artTitle, tagText] = tag;
    await prisma.tag.create({
      data: {
        artTitle,
        tag: tagText,
      },
    });
  }

  console.log("Dummy data has been added.");
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
