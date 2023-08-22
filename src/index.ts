import {
    onDocumentCreated,
} from "firebase-functions/v2/firestore";
import { setGlobalOptions } from "firebase-functions/v2";

setGlobalOptions({ maxInstances: 10 });

exports.createItemOnPlaces = onDocumentCreated("places/{placeId}", (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const data = snapshot.data();

    console.log(data);
});
