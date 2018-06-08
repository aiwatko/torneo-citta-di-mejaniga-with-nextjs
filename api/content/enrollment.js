import { db } from '../setup'

const doc = db.collection('pages').doc('rzKOJwNmfmNRaKmyRWH4');

export default doc.get().then(function(doc) {
    if (doc.exists) {
        return doc.data().content;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});