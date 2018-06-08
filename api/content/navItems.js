import { db } from '../setup'

export default db.collection('pages').where('active', '==', true).orderBy('order').get()
    .then(querySnapshot => {
        const navItems = [];
        querySnapshot.forEach(doc => {
            navItems.push({label: doc.data().nav_label, link: doc.data().link})
        })
        return navItems;
    })

