import { atom}  from 'recoil';

const brewListState = atom({
  key: 'brewListState',
  default: [
    {
      name: 'Boat',
      brewery: 'Carton Brewing',
      rating: 0,
      style: 'Session IPA',
    },
    {
      name: 'Head High',
      brewery: 'Kane Brewing',
      rating: 0,
      style: 'IPA',
    },
    {
      name: 'Darth Malt',
      brewery: 'Red Tank',
      rating: 0,
      style:'Black Saison',
    },
    {
      name: 'The Crisp',
      brewery:'Sixpoint',
      rating: 0,
      style:'Pilsner',
    },
    {
      name: 'le petit prince',
      brewery: 'Jester King',
      rating: 0,
      style:'Table beer',
    },
    {
      name: 'This Town',
      brewery: 'Carton Brewing',
      rating: 0,
      style:'Lager',
    },
  ]
})

export default brewListState;