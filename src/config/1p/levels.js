import photon from '../../images/levels/naturfag/Foton3.png';
import electron from '../../images/levels/naturfag/Elektron.png';
import proton from '../../images/levels/naturfag/Proton3.png';
import atom from '../../images/levels/naturfag/Atomkjerne2.png';
import hydrogen from '../../images/levels/naturfag/Hydrogen.png';
import karbon from '../../images/levels/naturfag/karbon.png';
import aminosyre from '../../images/levels/naturfag/Molekyl.png';
import protein from '../../images/levels/naturfag/Protein2.png';
import dna from '../../images/levels/naturfag/DNA3.png';
import cellekjerne from '../../images/levels/naturfag/Cellekjerne.png';
import celle from '../../images/levels/naturfag/Celle.png';
import hjerte from '../../images/levels/naturfag/Hjerte2.png';
import menneske from '../../images/levels/naturfag/Menneske2.png';
import nuclear from '../../images/levels/naturfag/Kjernekraftverk2.png';
import moon from '../../images/levels/naturfag/moon.png';
import jorda from '../../images/levels/naturfag/jord2.png';
import planet from '../../images/levels/naturfag/Planetene.png'; 
import sol from '../../images/levels/naturfag/Sol2.png';
import milky from '../../images/levels/naturfag/Melkeveien2.png';
import univers from '../../images/levels/naturfag/Universet2.png';

const levels = [
  {
    value: 'Naturfagselev',
    score: 0,
    text: 'Nybegynner',
  },
  { 
    value: 'Foton',
    score: 500,
    imageSource: photon,
    text: 'Fotoner er små energipakker og regnes som en av de minste elementærpartiklene. Fotoner beveger seg i lysets hastighet, og varierer i bølgelengde. Fotoner lærer du mer om under «Elektromagnetisk stråling, «Energi for fremtiden» og «Radioaktiv stråling».'
  },
  { 
    value: 'Elektron',
    score: 1300,
    imageSource:  electron,
    text: 'Elektroner går i baner rundt atomkjernen og har negativ ladning. Elektroner står sentralt i dannelsen av strøm, nordlys og kjernefysikk. Forsøket; ”The double-slit experiment”, viste at elektroner har både partikkel- og bølgeegenskaper. Elektroner lærer du mer om under «Elektromagnetisk stråling», «Radioaktiv stråling», «Energi for fremtiden» og «Redoksreaksjoner».',
  },
  { 
    value: 'Proton',
    score: 2300,
    imageSource:  proton,
    text: 'Protoner befinner seg i atomkjernen og har en positiv elektrisk ladning. De er 1000 ganger større enn elektroner, og er dermed en mye tyngre partikkel. Protoner lærer du mer om under «Radioaktivitet».',
  },
  {
    value: 'Atomkjerne',
    score: 4500,
    imageSource:  atom,
    text: 'Atomkjerner består av protoner og nøytroner. Antall protoner som finnes i kjernen er det som varierer mellom de ulike grunnstoffene. Atomkjerner er noen ganger ustabile, og kan dermed frigjøre enten alfa-, beta- eller gammastråler. Atomkjerner lærer du mer om under «Radioaktiv stråling».',
  },
  {
    value: 'Hydrogen',
    score: 7000,
    imageSource:  hydrogen,
    text: 'Hydrogen er det minste grunnstoffet som finnes, og det stoffet som forekommer mest i universet. Vi finner hydrogen i nesten alle organiske molekyler, og mange uorganiske stoffer. Hydrogen lærer du mer om under «Elektromagnetisk stråling» og «Redoksreaksjoner».'
  },
  {
    value:'Karbon',
    score: 10000,
    imageSource:  karbon,
    text: 'Karbon har seks protoner i kjernen og fire valenselektroner. Det gjør at karbon kan inngå i svært mange forbindelser og bli oksidert og redusert. Alle levende organismer på jorda er karbonbaserte. Karbon lærer du mer om under «Næringsstoffer og fordøyelsen» og «Redoksreaksjoner».'
  },
  {
    value:'Aminosyre',
    score: 15000,
    imageSource:  aminosyre,
    text: 'Aminosyrer består av karbon, hydrogen, oksygen, nitrogen og svovel. Noen aminosyrer kan kroppen lage selv, mens andre må den skaffe via kostholdet. Aminosyrer lærer du mer om under «Næringsstoffer og fordøyelsen» og «DNA, proteinsyntese og arv».'
  },
  {
    value:'Protein',
    score: 20000,
    imageSource:  protein,
    text: 'Proteiner er bygd opp av aminosyrer. Proteiner kan katalysere kjemiske reaksjoner, og da kalles de enzymer. Noen proteiner, for eksempel hemoglobin, frakter oksygen rundt i kroppen. Proteiner lærer du mer om under «Næringsstoffer og fordøyelsen» og «DNA, proteinsyntese og arv».'
  },
  {
    value:'DNA',
    score: 25000,
    imageSource:  dna,
    text: 'Deoksyribonukleinsyre er et stort molekyl bygd opp av et sukkermolekyl, et fosfatmolekyl og tilsammen fire forskjellige nitrogenbaser (adenin, cytosin, guanin og tymin). DNA er arvestoffet i alle cellene, og via proteinsyntesen gir de opphav til alle våre egenskaper. DNA lærer du mer om under «DNA, proteinsyntese og arv» og «Bioteknologi».',
  },
  {
    value:'Cellekjerne',
    score: 30000,
    imageSource:  cellekjerne,
    text: 'De fleste levende individer på planeten mangler en cellekjerne. De som har cellekjerne kalles eukaryoter, og her finner vi blant annet dyreceller og planteceller. Cellekjernen lærer du mer om under «DNA, proteinsyntese og arv» og «Bioteknologi».'
  },
  { 
    value: 'Celle',
    score: 37000,
    imageSource:  celle,
    text: 'Alle levende organismer er bygd opp av celler. Eukaryote organismer består av over 200 ulike celletyper, mens bakterier kun består av én. Celler lærer du mer om under «DNA, proteinsyntese og arv» og «Bioteknologi».',
  },
  { 
    value: 'Hjerte',
    score: 45000,
    imageSource:  hjerte,
    text: 'Hjertet er den største muskelen i kroppen og står flere millioner slag i løpet av et menneskeliv. I fremtiden vil det muligens være aktuelt å dyrke et nytt hjertet ved hjelp av stamcelleteknologi. Hjertet lærer du mer om under «DNA, proteinsyntese og arv» og «Bioteknologi».',
  },
  { 
    value: 'Menneske',
    score: 60000,
    imageSource:  menneske,
    text: 'Mennesket, eller Homo Sapiens, er den arten på planeten som har kommet lengst i forståelsen av vitenskap. Mennesket er undrende, kreative, nysgjerrige og stadig på leting etter ny kunnskap. Mennesket lærer du om i alle temaer i Naturfag.',
  },
  { 
    value: 'Kjernekraftverk',
    score: 75000,
    imageSource:  nuclear,
    text: 'Et kjernekraftverk benytter seg av radioaktiv stråling, og omdanner energien lagret i atomkjernene til elektrisk energi. Kjernekraft er mye omtalt i sosiale medier og politikk - selv om vi ikke har noe kjernekraft i Norge. Kjernekraft regnes som en fornybar energi. Kjernekraftverk lærer du mer om i «Økologi og bærekraftig utvikling» og «Radioaktiv stråling».',
  },
  { 
    value: 'Månen',
    score: 90000,
    imageSource:  moon,
    text: 'Månen er jordas eneste naturlig satellitt. Selv om månen befinner seg like langt unna sola som jorda, er den ikke like varm. Dette kommer av den tynne atmosfæren som månen har. Månen lærer du mer om under «Elektromagnetisk stråling».',
  },
  { 
    value: 'Jorda',
    score: 110000,
    imageSource:  jorda,
    text: 'Jorda er den tredje planeten fra sola, og den eneste planeten i solsystemet der vi vet det finnes liv. Jorda har eksistert i nesten 5 milliarder år, og har gjennomgått mange forandringer. Jorda lærer du mer om i «Elektromagnetisk stråling» og «Økologi og bærekraftig utvikling».',
  },
  { 
    value: 'Sola',
    score: 140000,
    imageSource:  sol,
    text: 'Sola er vår egen stjerne. Sola fusjonerer hydrogen til helium og er ca. halvveis i sitt liv. Sola avgir mer energi på 1 time, enn det mennesket har brukt de siste 2 000 årene. Sola lærer du mer om under «Elektromagnetisk stråling», Økologi og bærekraftig utvikling» og «Energi for fremtiden».',
  },
  { 
    value: 'Solsystem',
    score: 200000,
    imageSource:  planet,
    text: 'Solsystemet består av sola, planetene, kometene og alle legemer som går i bane rundt vår stjerne. Det finnes milliarder av solsystemer i galaksen, og de aller fleste av disse har planeter. Solsystemet lærer du mer om under «Elektromagnetisk stråling».',
  },
  { 
    value: 'Melkeveien',
    score: 300000,
    imageSource:  milky,
    text: 'Melkeveien er vår egen galakse og inneholder over 100 milliarder stjerner. Melkeveien er en spiralgalakse, og har en diameter på nesten 100 000 lysår! Dette gjør at vi mennesker mest sannsynlig aldri vil kunne utforske galaksen slik vi har utforsket jorda. Melkeveien lærer du mer om i «Elektromagnetisk stråling».',
  },
  { 
    value: 'Universet',
    score: 30000000000000,
    imageSource:  univers,
    text: 'Universet er alt som finnes, og alt som noensinne vil finnes. Universet består av mange milliarder galakser, og inneholder store gåter som sorte hull, mørk materie og mørk energi. Universet lærer du mer om under «Elektromagnetisk stråling». Gratulerer med å ha oppnådd det høyeste nivået i Naturfagsappen!',
  },
];

export default levels;
