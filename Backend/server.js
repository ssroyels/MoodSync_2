import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js"
import HistoryRoutes from "./routes/HistoryRoutes.js"
import LastMoodRoutes from "./routes/lastmoodRoutes.js"
import spotify from "./routes/spotifyapi.route.js"
import songRoutes from "./routes/songroute.js"
import dotenv from "dotenv";
const app = express();
dotenv.config(); 

app.use(express.json()); 

app.use(cors({
  origin: 'https://moodsync-1-oga6.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if you're using cookies or auth headers
}));
app.use(express.urlencoded({ extended: true }));

// For parsing application/json

// Use the router



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOURI).then(() => console.log("MongoDB Connected successfully"))
.catch((err) => console.log(err))
app.get('/', (req, res) => {
  res.send('MoodSync Backend is Live!');
});

app.use("/User",UserRoutes)

app.use("/mood",HistoryRoutes);
app.use("/lastmood",LastMoodRoutes)
app.use("/Music",spotify);
app.use("/songs", songRoutes);


app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
