import { db } from '../setup';

export default db
  .collection('pages')
  .where('active', '==', true)
  .orderBy('order')
  .get()
  .then(querySnapshot => {
    const navItems = [];
    querySnapshot.forEach(doc => {
      const label = doc.data().nav_label;
      const link = doc.data().link;
      const subitems = link === undefined ? doc.data().subitems : null;
      navItems.push({
        label: label,
        link: link,
        subitems: subitems
      });
    });

    // Dirty dirty hack, this should be in the db where all the rest of content is :/
    navItems.push({
      label: 'Edizioni passate',
      link: 'edizioni-passate',
      subitems: [
        {
          active: true,
          nav_label: 'Seconda edizione',
          link: 'seconda-edizione',
          number: 2
        },
        {
          active: true,
          nav_label: 'Terza edizione',
          link: 'terza-edizione',
          number: 3
        },
        {
          active: true,
          nav_label: 'Quarta edizione',
          link: 'quarta-edizione',
          number: 4
        },
        {
          active: true,
          nav_label: 'Quinta edizione',
          link: 'quinta-edizione',
          number: 5
        },
        {
          active: true,
          nav_label: 'Sesta edizione',
          link: 'sesta-edizione',
          number: 6
        },
        {
          active: true,
          nav_label: 'Settima edizione',
          link: 'settima-edizione',
          number: 7
        },
        {
          active: true,
          nav_label: 'Ottava edizione',
          link: 'ottava-edizione',
          number: 8
        },
        {
          active: true,
          nav_label: 'Nona edizione',
          link: 'nona-edizione',
          number: 9
        },
        {
          active: true,
          nav_label: 'Decima edizione',
          link: 'decima-edizione',
          number: 10
        },
        {
          active: true,
          nav_label: 'Undicesima edizione',
          link: 'undicesima-edizione',
          number: 11
        }
      ]
    });

    return navItems;
  });
