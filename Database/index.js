// db/initDB.js
const Database = require("better-sqlite3");
const db = new Database("arts.db");

// Users
db.exec(
  `CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  gender TEXT,
  email TEXT UNIQUE,
  country TEXT,
  password TEXT,
  bio TEXT,
  profilePhoto TEXT
);
`
);

const users = [
  [
    "Jane Doe",
    "Female",
    "janedoe01@gmail.com",
    "United States",
    "d584aafa51e5651777bf180c3ace41b76af42bdbea416a6b53fa28893d7cbaed25c186a7ee1ca37f7730b59047447179577289218ae5800621322330716bd0aa:db91b86d35c14147f68b7bac9f01646c",
    "A contemporary artist known for vibrant landscapes.",
    "/assets/artists/Jane_Doe.jpg",
  ],
  [
    "John Doe",
    "Male",
    "johndoe02@gmail.com",
    "Canada",
    "06337ccb8cbd2bb4c142a40e35cc2032589d710e176a8af12da485980f8ab1974109544bdddbb75d273f5ff306ea83c4bf7102ea332f49c3e7198f2fc0d8fd99:7d7a601661a481e1315403f711372fb7",
    "An abstract artist with a unique perspective on modern art.",
    "/assets/artists/John_Doe.jpg",
  ],
  [
    "Alice Green",
    "Female",
    "alicegreen03@gmail.com",
    "United States",
    "1bca942bddf1be0dbc075380be1b4e51dbdf1ede8c85085ad4a47ee239a891598f8736f81a6dc36dab2dddd99268dbac48a770490fb51018671d89a50aa46f8a:cd86d03f816efe59952af1fd0dc7077f",
    "A digital artist exploring the boundaries of virtual reality.",
    "/assets/artists/Alice_Green.jpg",
  ],
  [
    "Michael Brown",
    "Male",
    "michaelbrown04@gmail.com",
    "United States",
    "a90fdb7a4aba1e2bbe8b6f55f9ce06fb7018b27db4533678bfb9a19a16a108c91513137d9ce4d5c8e3460f7a49812567da92b18ef5043523f66fe8b47ab1065c:1579c3c0f39c55b83b0e59ac2501ee4c",
    "A sculptor whose works are featured in many public spaces.",
    "/assets/artists/Michael_Brown.jpg",
  ],
  [
    "Emma Wilson",
    "Female",
    "emmawilson05@gmail.com",
    "Mexico",
    "14160e5db81787d20db5ce34c93cb1d2f5e23e4917d3b6333b0e51bf8c743925691c398e1d64638e7f05049a9ac06a4ea5db91114879b0e10f43d0bf54b4d656:14fe40623689d13a6addd0e06513ed2f",
    "A watercolor artist known for her serene and calming pieces.",
    "/assets/artists/Emma_Wilson.jpeg",
  ],
  [
    "John Smith",
    "Male",
    "johnsmith06@gmail.com",
    "United States",
    "45f21a25935c782a6fd4f5c07c11c3cefdebfaa91506ffd8dddeb9b997b897fb2b904b8423a402aae62b9cfc0f079985abc7b6218c690ab379993db0db6cd3af:f5158ae7629a12855e3f08f3b005cc50",
    "A mixed media artist with a focus on urban landscapes.",
    "/assets/artists/John_Smith.jpg",
  ],
  [
    "Emily Johnson",
    "Female",
    "emilyjohnson07@gmail.com",
    "Canada",
    "93b0ec6262afb01c1417036f8318f95fcddea4bccf931714e3de7df0b643f96425116e520d653fe137de9aac61be7ead0329bc7ee901a297996b070821f22360:f2113307d68c05059765ec8359ed542b",
    "An illustrator and graphic designer.",
    "/assets/artists/Emily_Johnson.jpg",
  ],
  [
    "Anna White",
    "Female",
    "annawhite08@gmail.com",
    "Mexico",
    "2e9401986ab6a5f365273c35c7fc7acc5eb36525901f9e90062bba76f33c61b17ec6e4aadd8ac545c7257436ba46696233bf2b632149932ad04a93f6a358babc:8a2923b5fc47baa64d2557cfa368c19f",
    "A minimalist painter known for her geometric designs.",
    "/assets/artists/Anna_White.jpg",
  ],
  [
    "Mark Brown",
    "Male",
    "markbrown09@gmail.com",
    "Canada",
    "3b9b17d0a8a1b644288d9725a80d5434ccc64833df64de6d45af901df6c71c4c996e75ef553f7498bf66514365e5108f52678f4de501e0652f315d9fa4e15ec2:e7746566164c58d26b66411f5e096136",
    "A photographer capturing the essence of city life.",
    "/assets/artists/Mark_Brown.jpg",
  ],
  [
    "Rachel Moore",
    "Female",
    "rachelmoore10@gmail.com",
    "United States",
    "c7477c8c5a2773dbc8749e8e6a25653ff8f078669aa8f88d828ff97678a38786e66f3adf9b3812186105f8c57155b69bf359ca4f4328f9bea9439314be00e86c:2f3950fb948384b6e57ed92d77fdb4a0",
    "A printmaker with a passion for botanical subjects.",
    "/assets/artists/Rachel_Moore.jpg",
  ],
];

const insertUsers = db.prepare(`
INSERT INTO Users (name, gender, email, country, password , bio, profilePhoto) VALUES
(?, ?, ?, ?, ?, ?, ?)
`);
users.forEach((user) => insertUsers.run(user));

// Sessions
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id INTEGER NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES Users(id)
  );
`);

// ArtPieces
db.exec(`
    CREATE TABLE IF NOT EXISTS ArtPieces (
      title TEXT PRIMARY KEY,
      artistId INTEGER,
      yearCreated INTEGER,
      medium TEXT,
      description TEXT,
      image TEXT,
      gallery TEXT,
      city TEXT,
      country TEXT,
      price REAL,
      buyerId TEXT,
      paymentStatus INTEGER,
      FOREIGN KEY (artistId) REFERENCES Users(id)
    );
  `);

const artPieces = [
  [
    "Sunset Over the Mountains",
    1,
    2021,
    "Oil on Canvas",
    "A beautiful depiction of a sunset over the mountains, capturing the vibrant colors of the evening sky.",
    "/assets/art_pieces/Sunset-Over-the-Mountains.jpeg",
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
    "/assets/art_pieces/Morning-Bliss.jpeg",
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
    "/assets/art_pieces/City-Lights.jpeg",
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
    "/assets/art_pieces/Autumn-Leaves.jpeg",
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
    "/assets/art_pieces/Ocean-Waves.jpeg",
    "Coastal Art Gallery",
    "San Francisco",
    "USA",
    4000,
    null,
    0,
  ],
];

const insertArtPieces = db.prepare(`
  INSERT INTO ArtPieces (title, artistId, yearCreated, medium, description, image, gallery, city, country, price, buyerId, paymentStatus) VALUES
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

artPieces.forEach((artPiece) => insertArtPieces.run(artPiece));

// Reviews

db.exec(`
CREATE TABLE IF NOT EXISTS Reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artTitle TEXT,
  userId INTEGER,
  rating REAL,
  comment TEXT,
  FOREIGN KEY (artTitle) REFERENCES ArtPieces(title)
);
`);

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

const insertReviews = db.prepare(`
INSERT INTO Reviews (artTitle, userId, rating, comment) VALUES
(?, ?, ?, ?)
`);

reviews.forEach((review) => insertReviews.run(review));

// Tags

db.exec(`
CREATE TABLE IF NOT EXISTS Tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  artTitle TEXT,
  tag TEXT,
  FOREIGN KEY (artTitle) REFERENCES ArtPieces(title)
);
`);

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

const insertTags = db.prepare(`
INSERT INTO Tags (artTitle, tag) VALUES
(?, ?)
`);

tags.forEach((tag) => insertTags.run(tag));
