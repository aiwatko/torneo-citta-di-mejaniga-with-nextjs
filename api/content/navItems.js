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
    const pastEditions = [
      'Prima',
      'Seconda',
      'Terza',
      'Quarta',
      'Quinta',
      'Sesta',
      'Settima',
      'Ottava',
      'Nona',
      'Decima'
    ].map((edition, i) => ({
      active: true,
      nav_label: `${edition} edizione`,
      link: `${edition.toLocaleLowerCase()}-edizione`,
      number: i + 1
    }));

    navItems.push({
      label: 'Edizioni passate',
      link: 'edizioni-passate',
      subitems: pastEditions
    });

    return navItems;
  });
