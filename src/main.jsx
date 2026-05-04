import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Download,
  Gift,
  Grid3X3,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import "./styles.css";

const PROMPT_PRICE = "$1.99";
const KO_FI_URL = import.meta.env.VITE_KOFI_URL || "https://ko-fi.com/chaimmage";
const IMAGES_JSON_URL = import.meta.env.VITE_IMAGES_JSON_URL || "";
const COLLECTIONS_JSON_URL = import.meta.env.VITE_COLLECTIONS_JSON_URL || "";

const sampleCollections = [
  {
    id: "color-leak-reality",
    title: "Color Leak Reality",
    description:
      "High-impact liquid colour transformation visuals built for social posts, product mockups, and creative ads.",
    category: "Visual Effects",
    imageCount: 9,
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
    promptPackStatus: "Pending",
    teaser:
      "Unlock the full prompt set: fixed template, 9 example prompts, guidance, and bonus variations where included.",
  },
  {
    id: "paper-universes",
    title: "Paper Universes",
    description:
      "Whimsical folded-paper worlds, miniature landscapes, crafted cities, and editorial origami-style scenes.",
    category: "Crafted Worlds",
    imageCount: 9,
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
    promptPackStatus: "Pending",
    teaser:
      "Unlock the full prompt set: fixed template, 9 example prompts, guidance, and bonus variations where included.",
  },
  {
    id: "living-pencil-drawings",
    title: "Living Pencil Drawings",
    description:
      "Sketch-to-life visual concepts where pencil drawings become expressive animals and moving creative scenes.",
    category: "Art Magic",
    imageCount: 9,
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
    promptPackStatus: "Pending",
    teaser:
      "Unlock the full prompt set: fixed template, 9 example prompts, guidance, and bonus variations where included.",
  },
];

const sampleImages = [
  {
    id: "color-leak-reality-001",
    collectionId: "color-leak-reality",
    title: "Liquid Colour Bloom",
    category: "Visual Effects",
    thumbnail:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
  {
    id: "paper-universes-001",
    collectionId: "paper-universes",
    title: "Folded Paper Landscape",
    category: "Crafted Worlds",
    thumbnail:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
  {
    id: "living-pencil-drawings-001",
    collectionId: "living-pencil-drawings",
    title: "Sketch Animal Awakening",
    category: "Art Magic",
    thumbnail:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
  {
    id: "color-leak-reality-002",
    collectionId: "color-leak-reality",
    title: "Vivid Surface Flow",
    category: "Visual Effects",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
  {
    id: "paper-universes-002",
    collectionId: "paper-universes",
    title: "Miniature Dream World",
    category: "Crafted Worlds",
    thumbnail:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
  {
    id: "living-pencil-drawings-002",
    collectionId: "living-pencil-drawings",
    title: "Creative Sketch Moment",
    category: "Art Magic",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    preview:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85",
    download:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=90",
    promptPackPrice: PROMPT_PRICE,
    promptPackLink: "",
  },
];

function useRemoteData() {
  const [collections, setCollections] = useState(sampleCollections);
  const [images, setImages] = useState(sampleImages);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("Using sample data. Connect your R2 JSON URLs when ready.");

  useEffect(() => {
    async function load() {
      if (!IMAGES_JSON_URL || !COLLECTIONS_JSON_URL) return;

      setLoading(true);
      try {
        const [imagesRes, collectionsRes] = await Promise.all([
          fetch(IMAGES_JSON_URL),
          fetch(COLLECTIONS_JSON_URL),
        ]);

        if (!imagesRes.ok || !collectionsRes.ok) {
          throw new Error("Could not fetch website JSON files.");
        }

        const [remoteImages, remoteCollections] = await Promise.all([
          imagesRes.json(),
          collectionsRes.json(),
        ]);

        setImages(Array.isArray(remoteImages) ? remoteImages : sampleImages);
        setCollections(
          Array.isArray(remoteCollections) ? remoteCollections : sampleCollections
        );
        setNotice("");
      } catch (error) {
        console.error(error);
        setNotice("Could not load R2 JSON files. Showing sample data for now.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { collections, images, loading, notice };
}

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const parts = route.replace(/^#\/?/, "").split("/").filter(Boolean);
  return {
    page: parts[0] || "home",
    slug: parts[1] || "",
  };
}

function go(path) {
  window.location.hash = path;
}

function Header() {
  const links = [
    ["Gallery", "#/gallery"],
    ["Collections", "#/collections"],
    ["Licence", "#/licence"],
    ["Support", "#/support"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => go("/")} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500 text-white shadow-[0_24px_80px_rgba(124,58,237,0.25)]">
            <Sparkles size={22} />
          </div>
          <div className="text-left">
            <p className="text-xl font-black tracking-tight text-[#17112B]">chaimmage</p>
            <p className="-mt-1 text-xs font-medium text-slate-500">
              Download the Image. Unlock the Prompt.
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-semibold text-slate-700 transition hover:text-purple-600"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={KO_FI_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#17112B] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-600"
        >
          Donate
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-2xl font-black text-[#17112B]">chaimmage</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">
            A colourful AI image marketplace-style library where images are free
            and prompt packs unlock creative control.
          </p>
        </div>
        <div>
          <p className="font-bold text-[#17112B]">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <a href="#/gallery">Gallery</a>
            <a href="#/collections">Collections</a>
            <a href="#/licence">Licence</a>
            <a href="#/support">Support</a>
          </div>
        </div>
        <div>
          <p className="font-bold text-[#17112B]">Model</p>
          <p className="mt-3 text-sm text-slate-600">
            Free image downloads. Full prompt packs are optional digital products
            priced at {PROMPT_PRICE}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-orange-50">
      <div className="absolute left-[-10rem] top-[-10rem] h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-6rem] h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-bold text-purple-600 shadow-sm">
            <WandSparkles size={16} />
            Free AI images + {PROMPT_PRICE} prompt packs
          </div>
          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-[#17112B] sm:text-6xl lg:text-7xl">
            Download the Image.{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Unlock the Prompt.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            chaimmage is a free AI image library for creators, designers, and
            storytellers. Download images for free, then unlock the full prompt
            set behind each collection for {PROMPT_PRICE}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17112B] px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-purple-600"
            >
              Browse Free Images <ArrowRight size={18} />
            </a>
            <a
              href="#/collections"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 font-bold text-[#17112B] transition hover:-translate-y-0.5 hover:border-purple-600 hover:text-purple-600"
            >
              Explore Prompt Packs
            </a>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {sampleImages.slice(0, 4).map((image, index) => (
            <div
              key={image.id}
              className={`overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl ${
                index === 1 ? "mt-10" : ""
              }`}
            >
              <img
                src={image.thumbnail}
                alt={image.title}
                className="h-56 w-full rounded-[1.5rem] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Browse", "Explore colourful AI image collections for creative use."],
    ["Download", "Use individual images for free in your projects."],
    ["Unlock", `Buy the full prompt set for ${PROMPT_PRICE} when you want the creative recipe.`],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="font-bold uppercase tracking-wider text-purple-600">How it works</p>
        <h2 className="mt-2 text-3xl font-black text-[#17112B] sm:text-4xl">
          Simple, free-first, creator-friendly.
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map(([title, text], index) => (
          <div key={title} className="rounded-[2rem] bg-white p-7 shadow-lg ring-1 ring-slate-100">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-lg font-black text-white">
              {index + 1}
            </div>
            <h3 className="text-xl font-black text-[#17112B]">{title}</h3>
            <p className="mt-2 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromptPackBox({ link = "", collectionTitle = "this collection" }) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#17112B] to-purple-600 p-7 text-white shadow-[0_24px_80px_rgba(124,58,237,0.25)]">
      <div className="flex items-center gap-3">
        <Gift className="text-amber-400" />
        <p className="text-xl font-black">Prompt Pack — {PROMPT_PRICE}</p>
      </div>
      <p className="mt-3 text-white/80">
        Unlock the full prompt set behind {collectionTitle}. Each pack is built
        to help you recreate, customise, and extend the visual style.
      </p>
      <ul className="mt-5 space-y-2 text-sm text-white/90">
        <li>✓ Fixed prompt template</li>
        <li>✓ 9 example prompts</li>
        <li>✓ User guidance / prompt instructions</li>
        <li>✓ Bonus examples where included</li>
        <li>✓ Style and variation ideas</li>
      </ul>
      <a
        href={link || KO_FI_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 font-black text-[#17112B] transition hover:-translate-y-0.5 hover:bg-amber-400"
      >
        Unlock Prompt Pack — {PROMPT_PRICE}
      </a>
    </div>
  );
}

function ImageCard({ image, collection }) {
  const link = image.promptPackLink || collection?.promptPackLink || KO_FI_URL;
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
      <a href={`#/image/${image.id}`} className="block overflow-hidden">
        <img
          src={image.thumbnail}
          alt={image.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </a>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
            {image.category || collection?.category || "AI Image"}
          </span>
          <span className="text-xs font-bold text-slate-400">{PROMPT_PRICE} prompt</span>
        </div>
        <h3 className="line-clamp-1 text-lg font-black text-[#17112B]">{image.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">
          {collection?.title || "Prompt collection"}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={image.download}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-[#17112B] hover:bg-slate-200"
          >
            <Download size={14} /> Free
          </a>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#17112B] px-3 py-2 text-xs font-black text-white hover:bg-purple-600"
          >
            Unlock {PROMPT_PRICE}
          </a>
        </div>
      </div>
    </article>
  );
}

function CollectionCard({ collection, images }) {
  const collectionImages = images.filter((img) => img.collectionId === collection.id).slice(0, 4);
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="grid grid-cols-2 gap-2">
        {(collectionImages.length ? collectionImages : sampleImages.slice(0, 4)).map((img) => (
          <img
            key={img.id}
            src={img.thumbnail}
            alt={img.title}
            className="h-32 w-full rounded-2xl object-cover"
            loading="lazy"
          />
        ))}
      </div>
      <div className="p-3">
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-black text-pink-600">
            {collection.category || "Collection"}
          </span>
          <span className="text-xs font-black text-purple-600">{PROMPT_PRICE}</span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#17112B]">{collection.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{collection.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={`#/collection/${collection.id}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-[#17112B] hover:border-purple-600 hover:text-purple-600"
          >
            View
          </a>
          <a
            href={collection.promptPackLink || KO_FI_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#17112B] px-4 py-3 text-sm font-black text-white hover:bg-purple-600"
          >
            Unlock
          </a>
        </div>
      </div>
    </article>
  );
}

function Home({ collections, images, notice, loading }) {
  return (
    <>
      <Hero />
      {(notice || loading) && (
        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-amber-100 px-5 py-4 text-sm font-semibold text-[#17112B]">
            {loading ? "Loading website data..." : notice}
          </div>
        </div>
      )}
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-bold uppercase tracking-wider text-pink-500">Featured collections</p>
            <h2 className="mt-2 text-3xl font-black text-[#17112B] sm:text-4xl">
              Prompt sets with visual proof.
            </h2>
          </div>
          <a href="#/collections" className="hidden font-black text-purple-600 sm:block">
            View all →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} images={images} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-bold uppercase tracking-wider text-cyan-500">Free gallery preview</p>
            <h2 className="mt-2 text-3xl font-black text-[#17112B] sm:text-4xl">
              Download images free.
            </h2>
          </div>
          <a href="#/gallery" className="hidden font-black text-purple-600 sm:block">
            Browse gallery →
          </a>
        </div>
        <ImageGrid images={images.slice(0, 6)} collections={collections} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <PromptPackBox />
        <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <ShieldCheck className="text-cyan-500" size={34} />
          <h2 className="mt-4 text-3xl font-black text-[#17112B]">No login needed at launch.</h2>
          <p className="mt-4 text-slate-600">
            Visitors browse and download free images directly. Paid prompt packs
            are handled through Ko-fi, so chaimmage stays simple and fast.
          </p>
          <a
            href="#/licence"
            className="mt-6 inline-flex items-center gap-2 font-black text-purple-600"
          >
            Read the licence <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}

function ImageGrid({ images, collections }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => {
        const collection = collections.find((c) => c.id === image.collectionId);
        return <ImageCard key={image.id} image={image} collection={collection} />;
      })}
    </div>
  );
}

function Gallery({ collections, images }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [collectionId, setCollectionId] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))],
    [images]
  );

  const filtered = images.filter((image) => {
    const collection = collections.find((c) => c.id === image.collectionId);
    const text = `${image.title} ${image.category} ${collection?.title || ""}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = category === "All" || image.category === category;
    const matchesCollection = collectionId === "All" || image.collectionId === collectionId;
    return matchesQuery && matchesCategory && matchesCollection;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageTitle
        icon={<Grid3X3 />}
        label="Free gallery"
        title="Browse free AI images."
        text={`Download any image for free. Unlock the full collection prompt pack for ${PROMPT_PRICE} when you want the creative formula.`}
      />

      <div className="mb-8 grid gap-3 rounded-[2rem] bg-white p-4 shadow-lg ring-1 ring-slate-100 md:grid-cols-3">
        <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search images, categories, collections..."
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold outline-none"
        >
          <option value="All">All collections</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <ImageGrid images={filtered} collections={collections} />
    </main>
  );
}

function Collections({ collections, images }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageTitle
        icon={<WandSparkles />}
        label="Prompt collections"
        title={`Full prompt packs for ${PROMPT_PRICE}.`}
        text="Each collection includes free image examples and an optional paid prompt pack with the template, examples, and guidance."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} images={images} />
        ))}
      </div>
    </main>
  );
}

function CollectionDetail({ slug, collections, images }) {
  const collection = collections.find((c) => c.id === slug) || collections[0];
  const collectionImages = images.filter((i) => i.collectionId === collection.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="font-black uppercase tracking-wider text-purple-600">
            {collection.category || "Collection"}
          </p>
          <h1 className="mt-3 text-4xl font-black text-[#17112B] sm:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {collection.description}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collectionImages.map((image) => (
              <ImageCard key={image.id} image={image} collection={collection} />
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <PromptPackBox
            link={collection.promptPackLink || KO_FI_URL}
            collectionTitle={collection.title}
          />
        </aside>
      </div>
    </main>
  );
}

function ImageDetail({ slug, collections, images }) {
  const image = images.find((i) => i.id === slug) || images[0];
  const collection = collections.find((c) => c.id === image.collectionId);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl">
        <img
          src={image.preview || image.thumbnail}
          alt={image.title}
          className="max-h-[720px] w-full rounded-[1.5rem] object-cover"
        />
      </div>
      <div>
        <p className="font-black uppercase tracking-wider text-pink-500">
          {image.category || "AI Image"}
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#17112B]">{image.title}</h1>
        <p className="mt-4 text-slate-600">
          This image is free to download. It belongs to the{" "}
          <a className="font-black text-purple-600" href={`#/collection/${collection?.id}`}>
            {collection?.title || "prompt collection"}
          </a>{" "}
          prompt set.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href={image.download}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-4 font-black text-[#17112B] hover:bg-slate-200"
          >
            <Download size={18} /> Download Free Image
          </a>
          <a
            href={image.promptPackLink || collection?.promptPackLink || KO_FI_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#17112B] px-6 py-4 font-black text-white hover:bg-purple-600"
          >
            Unlock Prompt Pack — {PROMPT_PRICE}
          </a>
        </div>

        <div className="mt-8">
          <PromptPackBox
            link={image.promptPackLink || collection?.promptPackLink || KO_FI_URL}
            collectionTitle={collection?.title || "this collection"}
          />
        </div>
      </div>
    </main>
  );
}

function PageTitle({ icon, label, title, text }) {
  return (
    <div className="mb-10">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-black text-purple-600">
        {React.cloneElement(icon, { size: 16 })}
        {label}
      </div>
      <h1 className="max-w-4xl text-4xl font-black tracking-tight text-[#17112B] sm:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{text}</p>
    </div>
  );
}

function Licence() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageTitle
        icon={<ShieldCheck />}
        label="Licence"
        title="Simple terms for images and prompts."
        text="This starter wording is practical for launch. Have it reviewed professionally if you need formal legal protection."
      />
      <div className="space-y-6">
        <PolicyCard title="Free Image Licence">
          You may download and use the free images for personal and commercial
          creative projects, including websites, social media, videos,
          presentations, posters, and design work. You may not resell,
          redistribute, or repackage the free images as a competing standalone
          image library, stock image pack, or bulk download collection.
        </PolicyCard>
        <PolicyCard title="Prompt Pack Licence">
          Prompt packs are paid digital products. Buyers may use the prompts to
          generate new creative outputs for personal or commercial projects.
          Prompt packs may not be resold, redistributed, copied into another
          prompt marketplace, shared publicly, or repackaged as a competing
          prompt collection.
        </PolicyCard>
        <PolicyCard title="Disclaimer">
          Users are responsible for checking whether an image or prompt output is
          suitable for their specific legal, commercial, or platform use.
        </PolicyCard>
      </div>
    </main>
  );
}

function PolicyCard({ title, children }) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100">
      <h2 className="text-2xl font-black text-[#17112B]">{title}</h2>
      <p className="mt-3 leading-8 text-slate-600">{children}</p>
    </section>
  );
}

function Support() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageTitle
        icon={<Gift />}
        label="Support"
        title="Help keep chaimmage growing."
        text="Images are free to download. Prompt packs and donations help support storage, organisation, new collections, and ongoing improvements."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white shadow-[0_24px_80px_rgba(124,58,237,0.25)]">
          <h2 className="text-3xl font-black">Donate on Ko-fi</h2>
          <p className="mt-3 text-white/80">
            A small donation helps keep the free image library available.
          </p>
          <a
            href={KO_FI_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#17112B] hover:bg-amber-400"
          >
            Support chaimmage
          </a>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <Mail className="text-purple-600" />
          <h2 className="mt-4 text-3xl font-black text-[#17112B]">Contact</h2>
          <p className="mt-3 text-slate-600">
            Add your email or contact form here when ready.
          </p>
          <a
            href="mailto:hello@chaimmage.com"
            className="mt-6 inline-flex rounded-full bg-[#17112B] px-6 py-3 font-black text-white hover:bg-purple-600"
          >
            Email chaimmage
          </a>
        </div>
      </div>
    </main>
  );
}

function App() {
  const { collections, images, loading, notice } = useRemoteData();
  const { page, slug } = useHashRoute();

  let content;
  if (page === "gallery") content = <Gallery collections={collections} images={images} />;
  else if (page === "collections") content = <Collections collections={collections} images={images} />;
  else if (page === "collection") content = <CollectionDetail slug={slug} collections={collections} images={images} />;
  else if (page === "image") content = <ImageDetail slug={slug} collections={collections} images={images} />;
  else if (page === "licence") content = <Licence />;
  else if (page === "support") content = <Support />;
  else content = <Home collections={collections} images={images} loading={loading} notice={notice} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {content}
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
