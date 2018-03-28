import photon from '../images/photon.png';
import electron from '../images/electron-300px.png';

const levels = [
  { 
    value: 'Foton',
    score: 500,
    imageSource: photon,
    text: 'A photon is a type of elementary particle, the quantum of the electromagnetic field including electromagnetic radiation such as light, and the force carrier for the electromagnetic force (even when static via virtual particles). The photon has zero rest mass and always moves at the speed of light within a vacuum'
  },
  { 
    value: 'Elektron',
    score: 1300,
    imageSource:  electron,
    text: 'The electron is a subatomic particle, symbol e− or β−, whose electric charge is negative one elementary charge.[8] Electrons belong to the first generation of the lepton particle family,[9] and are generally thought to be elementary particles because they have no known components or substructure.',
  },
  { 
    value: 'Proton',
    score: 2300,
    imageSource:  electron,
    text: 'A proton is a subatomic particle, symbol p or p+, with a positive electric charge of +1e elementary charge and mass slightly less than that of a neutron.',
  },
  {
    value: 'Atomkjerne',
    score: 4500,
    imageSource:  electron,
  },
  {
    value: 'Hydrogen',
    score: 7000,
    imageSource:  electron,
  },
  {
    value:'Karbon',
    score: 10000,
    imageSource:  electron,
  },
  {
    value:'Aminosyre',
    score: 15000,
    imageSource:  electron,
  },
  {
    value:'Protein',
    score: 20000,
    imageSource:  electron,
  },
  {
    value:'DNA',
    score: 25000,
    imageSource:  electron,
  },
  {
    value:'Cellekjerne',
    score: 30000,
    imageSource:  electron,
  },
  { value: 'Celle', score: 37000 },
  { value: 'Hjerte', score: 45000 },
  { value: 'Menneske', score: 60000 },
  { value: 'Kjernekraftverk', score: 75000 },
  { value: 'Månen', score: 90000 },
  { value: 'Jorden', score: 110000 },
  { value: 'Solen', score: 140000 },
  { value: 'Solsystem', score: 200000 },
  { value: 'Melkeveien', score: 300000 },
  { value: 'Universet', score: 30000000000000 },
];

export default levels;
