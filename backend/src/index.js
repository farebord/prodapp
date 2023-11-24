const express = require("express");
const { Sequelize, DataTypes, Op, literal } = require("sequelize");
const { faker } = require("@faker-js/faker");
const cors = require("cors");
const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());
const sequelize = new Sequelize(config.dbname, config.dbuser, config.dbpass, {
  dialect: "postgres",
  port: 5432,
  host: "database",
});

const Product = sequelize.define("product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.REAL,
    allowNull: false,
    defaultValue: 0,
  },
});

// Syncronize models with database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.log(`There was an error syncing the database: ${err}`);
  });

const createRandomProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    category: faker.commerce.department(),
    price: faker.number.float({ min: 10, max: 100, precision: 0.01 }),
  };
};

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/products", async (req, res) => {
  const search = req.query.search ? `%${req.query.search}%` : null;
  const products = await Product.findAll(
    search
      ? {
          where: {
            [Op.or]: [
              {
                title: {
                  [Sequelize.Op.iLike]: search,
                },
              },
              {
                category: {
                  [Sequelize.Op.iLike]: search,
                },
              },
              {
                description: {
                  [Sequelize.Op.iLike]: search,
                },
              },
            ],
          },
          order: [["createdAt", "ASC"]],
        }
      : {
          order: [["createdAt", "ASC"]],
        }
  );
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = await Product.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
  });
  res.json(product);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  product.title = req.body.title;
  product.description = req.body.description;
  product.category = req.body.category;
  product.price = req.body.price;
  await product.save();
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await product.destroy();
  res.json(product);
});

app.get("/generate_products", async (req, res) => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    const newProduct = await Product.create(createRandomProduct());
    products.push(newProduct);
  }
  res.json(products);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
