import { db } from '../setup'

//TODO: define a general data fetching function
const getContent = (templateId) => {
    return new Promise((resolve, reject) => {
        db.collection('pages').doc(templateId).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data().content;
            } else {
                console.log("No such document!");
            }
        })
        .then(data => {
            this.setState({
                sponsorsContent: data           
            })
            console.log(data)
        })
        .catch(error => {
            console.log("Error getting document:", error);
        })
    })
};

export default getContent;