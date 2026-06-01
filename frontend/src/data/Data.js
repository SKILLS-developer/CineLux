import Batman from "../assets/thumbnail/The Batman.jpg";
import Dune from "../assets/thumbnail/Dune.jpg";
import Oppenheimer from "../assets/thumbnail/Oppen Heimer.jpg";
import JohnWick from "../assets/thumbnail/John Wick.jpg";
import Spiderman from "../assets/thumbnail/SpiderMan.jpg";
import EnolaHolmes2 from "../assets/thumbnail/Enola Holmes 2.jpg";
import SatansSlaves from "../assets/thumbnail/Satan's Slaves .jpg";
import TheFlash from "../assets/thumbnail/The Flash.jpg";
import WeakHero from "../assets/thumbnail/Weak Hero.jpg";
import WonderWoman from "../assets/thumbnail/Wonder Woman.jpg";
const base = import.meta.env.BASE_URL ?? "/";
const vid = (name) => `${base}videos/${name}`;

const EnolaHolmesV = vid("Enola Holmes 2.mp4");
const SatansSlavesV = vid("SATAN'S SLAVES.mp4");
const TheFlashV = vid("The Flash.mp4");
const WeakHeroV = vid("Weak Hero Class 2.mp4");
const WonderWomanV = vid("WONDER WOMAN.mp4");
const BatmanTrailer = vid("THE BATMAN \u2013 Trailer.mp4");
const DuneV = vid("Dune.mp4");
const OppenheimerV = vid("Oppenheimer.mp4");
const JohnWickV = vid("John Wick.mp4");
const SpidermanV = vid("Spider-Man.mp4");

export default [
  {
    id: "enola-holmes-2",
    title: "Enola Holmes 2",
    rating: 4.8,
    meta: "Action ",
    duration: "2h 0m",
    description:
      "Enola Holmes, the younger sister of the famous detective Sherlock Holmes, embarks on a thrilling adventure to solve a mysterious case that has stumped even her brilliant brother.",
    thumbnail: EnolaHolmes2,
    type: "movie",
    isFree: true,
    releaseDate: "2024-06-01",
    createdAt: "2024-06-10",
    views: 1200,
    trailer: EnolaHolmesV,
    videoUrl: EnolaHolmesV,
  },
  {
    id: "satans-slaves",
    title: "Satan's Slaves",
    rating: 4.6,
    meta: "Horror ",
    duration: "1h 47m",
    thumbnail: SatansSlaves,
    type: "movie",
    isFree: false,
    releaseDate: "2024-05-15",
    createdAt: "2024-06-12",
    views: 800,
    trailer: SatansSlavesV,
    videoUrl: SatansSlavesV,
  },
  {
    id: "the-flash",
    title: "The Flash",
    rating: 4.6,
    meta: "Mystery ",
    duration: "2h 24m",
    thumbnail: TheFlash,
    type: "movie",
    isFree: true,
    releaseDate: "2024-06-20",
    createdAt: "2024-06-15",
    views: 1500,
    trailer: TheFlashV,
    videoUrl: TheFlashV,
  },
  {
    id: "weak-hero",
    title: "Weak Hero",
    rating: 4.6,
    meta: "Action • Drama",
    duration: "8 Episodes",
    thumbnail: WeakHero,
    type: "series",
    isFree: true,
    releaseDate: "2024-06-25",
    createdAt: "2024-06-18",
    views: 2000,
    trailer: WeakHeroV,
    videoUrl: WeakHeroV,
  },
  {
    id: "wonder-woman-1",
    title: "Wonder Woman",
    rating: 4.6,
    meta: "Action ",
    duration: "2h 21m",
    thumbnail: WonderWoman,
    type: "movie",
    isFree: false,
    releaseDate: "2024-07-01",
    createdAt: "2024-06-20",
    views: 1800,
    trailer: WonderWomanV,
    videoUrl: WonderWomanV,
  },
  {
    id: "batman",
    title: "The Batman",
    rating: 4.8,
    meta: "Action • Drama",
    duration: "2h 56m",
    thumbnail: Batman,
    type: "movie",
    isFree: true,
    releaseDate: "2022-03-04",
    createdAt: "2022-02-20",
    views: 5000000,
    trailer: BatmanTrailer,
    videoUrl: BatmanTrailer,
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    rating: 4.9,
    meta: "Sci-Fi • Adventure",
    duration: "2h 46m",
    thumbnail: Dune,
    type: "movie",
    isFree: false,
    releaseDate: "2024-03-01",
    createdAt: "2024-03-15",
    views: 4200000,
    trailer: DuneV,
    videoUrl: DuneV,
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    rating: 4.8,
    meta: "History • Thriller",
    duration: "3h 0m",
    thumbnail: Oppenheimer,
    type: "movie",
    isFree: false,
    releaseDate: "2023-07-21",
    createdAt: "2023-08-01",
    views: 3900000,
    trailer: OppenheimerV,
    videoUrl: OppenheimerV,
  },
  {
    id: "john-wick-4",
    title: "John Wick 4",
    rating: 4.7,
    meta: "Action • Crime",
    duration: "2h 49m",
    thumbnail: JohnWick,
    type: "movie",
    isFree: false,
    releaseDate: "2023-03-24",
    createdAt: "2023-04-02",
    views: 3600000,
    trailer: JohnWickV,
    videoUrl: JohnWickV,
  },
  {
    id: "across-the-spider-verse",
    title: "Across the Spider-Verse",
    rating: 4.9,
    meta: "Animation • Adventure",
    duration: "2h 20m",
    thumbnail: Spiderman,
    type: "movie",
    isFree: true,
    releaseDate: "2023-06-02",
    createdAt: "2023-06-12",
    views: 4100000,
    trailer: SpidermanV,
    videoUrl: SpidermanV,
  },
];
