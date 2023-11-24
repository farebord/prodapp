const port = process.env.PORT || 3001;
const dbhost = "database";
const dbname = process.env.POSTGRES_DB || "prodapp";
const dbuser = process.env.POSTGRES_USER || "prodapp";
const dbpass = process.env.POSTGRES_PASSWORD || "prodapp";

module.exports = {
  port,
  dbhost,
  dbname,
  dbuser,
  dbpass,
};
