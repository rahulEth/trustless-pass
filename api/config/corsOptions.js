const allowdedOrigins = ["http://127.0.0.1:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowdedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error: Not Allowded"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
