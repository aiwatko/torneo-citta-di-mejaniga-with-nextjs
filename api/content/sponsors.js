import { db } from '../setup'

const doc = db.collection('pages').doc('zB7TKg92GHD6EI9Gw9fl');

export default doc.get().then(function(doc) {
    if (doc.exists) {
        return doc.data().content;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});