import photon from '../images/photon.png';
import electron from '../images/electron-300px.png';

const levels = [
  { 
    value: 'Foton',
    score: 1000,
    title: 'du er foton',
    imageSource: photon,
    text: 'A photon is a type of elementary particle, the quantum of the electromagnetic field including electromagnetic radiation such as light, and the force carrier for the electromagnetic force (even when static via virtual particles). The photon has zero rest mass and always moves at the speed of light within a vacuum'
  },
  { 
    value: 'Elektron',
    score: 3000,
    title: 'du er elektron',
    imageSource:  electron,
    text: 'The electron is a subatomic particle, symbol e− or β−, whose electric charge is negative one elementary charge.[8] Electrons belong to the first generation of the lepton particle family,[9] and are generally thought to be elementary particles because they have no known components or substructure.',
  },
  { 
    value: 'Proton',
    score: 6000,
    title: 'du er proton',
    imageSource:  electron,
    text: 'A proton is a subatomic particle, symbol p or p+, with a positive electric charge of +1e elementary charge and mass slightly less than that of a neutron.',
  },
  {
    value: 'Atomkjerne',
    score: 10000,
    imageSource:  electron,
  },
  {
    value:'Atom',
    score: 20000,
    imageSource:  electron,
  },
  {
    value:'Molekyl',
    score: 40000,
    imageSource:  electron,
  },
  { value: 'Celle', score: 80000 },
  { value: 'Organ', score: 150000 },
  { value: 'Menneske', score: 300000 },
  { value: 'Planet', score: 500000 },
  { value: 'Stjerne', score: 700000 },
  { value: 'Galakse', score: 1500000 },
  { value: 'b0$$', score: 30000000000000 },
];

export default levels;
