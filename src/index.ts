import axios from "axios";
import * as express from "express";
import { Request, Response } from "express";
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

setGlobalOptions({ maxInstances: 5 });

const app = express();
app.use(express.json());

app.post("/getPlacesData", async (req: Request, res: Response) => {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
        res.status(400).send({ error: "Lat and Lon are required!" });
        return;
    }
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({
            error: "Failed to fetch data from OpenStreetMap",
        });
    }
});

exports.app = onRequest(app);
