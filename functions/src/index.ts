import express from "express";
import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { placesOfInterest } from "./openai";
import { isTPlace } from "./typeguards";
import { getLocationData } from "./utility";

setGlobalOptions({ maxInstances: 5 });

const app = express();
app.use(express.json());

app.post("/getPlacesData", async (req: express.Request, res: express.Response) => {
    const { lat, lon } = req.body;
    const locationData = await getLocationData(lat, lon);
    if (isTPlace(locationData)) {
        const places = await placesOfInterest(locationData);
        res.status(200).send(places);
    } else {
        res.status(locationData.statusCode).send(locationData);
    }
});

exports.app = onRequest(app);
