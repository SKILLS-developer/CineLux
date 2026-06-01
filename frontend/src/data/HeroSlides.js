import Batman from "../assets/thumbnail/The Batman.jpg";
import Dune from "../assets/thumbnail/Dune.jpg";
import Oppenheimer from "../assets/thumbnail/Oppen Heimer.jpg";
import JohnWick from "../assets/thumbnail/John Wick.jpg";
import Spiderman from "../assets/thumbnail/SpiderMan.jpg";
const base = import.meta.env.BASE_URL ?? "/";
const vid = (name) => `${base}videos/${name}`;
const BatmanTrailer = vid("THE BATMAN \u2013 Trailer.mp4");
const DuneV = vid("Dune.mp4");
const OppenheimerV = vid("Oppenheimer.mp4");
const JohnWickV = vid("John Wick.mp4");
const SpidermanV = vid("Spider-Man.mp4");
export const HeroSlides = [
  {
    id: "batman",
    year: "2022",
    title: "The Batman",
    meta: "2 hr 56 min • Action • Drama",
    description:
      "Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.",
    thumbnail: Batman,
    trailer: BatmanTrailer,
  },
  {
    id: "dune-part-two",
    year: "2024",
    title: "Dune: Part Two",
    meta: "2 hr 46 min • Sci-Fi • Adventure",
    description:
      "Paul Atreides unites with the Fremen while seeking vengeance against those who destroyed his family, balancing destiny, loyalty, and the fate of Arrakis.",
    thumbnail: Dune,
    trailer: DuneV,
  },
  {
    id: "oppenheimer",
    year: "2023",
    title: "Oppenheimer",
    meta: "3 hr 0 min • History • Thriller",
    description:
      "The story of J. Robert Oppenheimer and the creation of the atomic bomb unfolds as a high-stakes portrait of ambition, politics, and moral consequence.",
    thumbnail: Oppenheimer,
    trailer: OppenheimerV,
  },
  {
    id: "john-wick-4",
    year: "2023",
    title: "John Wick 4",
    meta: "2 hr 49 min • Action • Crime",
    description:
      "John Wick discovers a path to defeat The High Table, but before earning his freedom he must face new enemies and old ghosts in a global showdown.",
    thumbnail: JohnWick,
    trailer: JohnWickV,
  },
  {
    id: "across-the-spider-verse",
    year: "2023",
    title: "Across the Spider-Verse",
    meta: "2 hr 20 min • Animation • Adventure",
    description:
      "Miles Morales catapults across dimensions and collides with a team of Spider-People who must redefine what heroism means when every universe is at risk.",
    thumbnail: Spiderman,
    trailer: SpidermanV,
  },
];
