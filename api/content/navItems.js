import { db } from '../setup'

export default db.collection('pages').where('active', '==', true).orderBy('order').get()
    .then(querySnapshot => {
        const navItems = [];
        querySnapshot.forEach(doc => {
            const label = doc.data().nav_label
            const link = doc.data().link
            const subitems = link === undefined ? doc.data().subitems : null;
            navItems.push({
                label: label, 
                link: link,
                subitems: subitems
            })
        })
        return navItems;
    })

