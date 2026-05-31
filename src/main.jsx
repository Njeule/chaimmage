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

const PROMPT_PRICE = "$2.99";
const KO_FI_URL = import.meta.env.VITE_KOFI_URL || "https://ko-fi.com/promptwagon";
const IMAGES_JSON_URL = import.meta.env.VITE_IMAGES_JSON_URL || "";
const COLLECTIONS_JSON_URL = import.meta.env.VITE_COLLECTIONS_JSON_URL || "";
const CURRENT_YEAR = new Date().getFullYear();

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

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function getTags(item) {
  return asArray(item?.tags);
}

function getImageCategory(image, collection) {
  return (
    image?.category ||
    image?.primary_category ||
    image?.primaryCategory ||
    collection?.category ||
    collection?.primaryCategory ||
    "AI Image"
  );
}

function getItemCategories(item) {
  return [
    item?.category,
    item?.primary_category,
    item?.primaryCategory,
    ...asArray(item?.categories),
  ].filter(Boolean);
}

function getPromptPackLink(item, fallback = KO_FI_URL) {
  return item?.promptPackLink || item?.stripePaymentLinkUrl || fallback;
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
          <img
            src="/icon.png"
            alt="PromptWagon icon"
            className="h-11 w-11 rounded-2xl object-contain shadow-[0_18px_60px_rgba(124,58,237,0.16)]"
          />
          <div className="text-left leading-tight">
            <p className="text-xl font-black tracking-tight text-[#17112B]">
              Prompt<span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">W</span>agon
            </p>
            <p className="text-xs font-medium text-slate-500">
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
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="PromptWagon icon" className="h-10 w-10 rounded-xl object-contain" />
            <p className="text-xl font-black tracking-tight text-[#17112B]">
              Prompt<span className="bg-gradient-to-r from-fuchsia-500 to-orange-500 bg-clip-text text-transparent">W</span>agon
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-600">
            A colourful AI asset marketplace where images are free and prompt
            packs unlock creative control.
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
          <p className="mt-4 text-xs font-semibold text-slate-400">
            © {CURRENT_YEAR} PromptWagon. All rights reserved.
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
            PromptWagon is a creative AI asset marketplace for creators,
            designers, and storytellers. Download images for free, then unlock
            the full prompt pack behind each collection for {PROMPT_PRICE}.
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
  const link = getPromptPackLink(image, getPromptPackLink(collection));
  const category = getImageCategory(image, collection);
  const tags = [...getTags(image), ...getTags(collection)].slice(0, 3);
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
            {category}
          </span>
          <span className="text-xs font-bold text-slate-400">{PROMPT_PRICE} prompt</span>
        </div>
        <h3 className="line-clamp-1 text-lg font-black text-[#17112B]">{image.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">
          {collection?.title || "Prompt collection"}
        </p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        )}
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
  const category = collection.primaryCategory || collection.category || "Collection";
  const tags = getTags(collection).slice(0, 3);
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
            {category}
          </span>
          <span className="text-xs font-black text-purple-600">{PROMPT_PRICE}</span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#17112B]">{collection.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{collection.description}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={`#/collection/${collection.id}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-black text-[#17112B] hover:border-purple-600 hover:text-purple-600"
          >
            View
          </a>
          <a
            href={getPromptPackLink(collection)}
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
          <h2 className="mt-4 text-3xl font-black text-[#17112B]">No login needed.</h2>
          <p className="mt-4 text-slate-600">
            Visitors can browse and download free images instantly. Paid prompt
            packs and optional donations are processed securely through external
            checkout, keeping PromptWagon simple, fast, and creator-friendly.
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

  const collectionById = useMemo(
    () => Object.fromEntries(collections.map((collection) => [collection.id, collection])),
    [collections]
  );

  const categories = useMemo(() => {
    const allCategories = images.flatMap((image) => {
      const collection = collectionById[image.collectionId];
      return [...getItemCategories(image), ...getItemCategories(collection)];
    });
    return ["All", ...Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b))];
  }, [images, collectionById]);

  const filtered = images.filter((image) => {
    const collection = collectionById[image.collectionId];
    const searchableParts = [
      image.title,
      image.alt,
      image.caption,
      ...getItemCategories(image),
      ...getTags(image),
      collection?.title,
      collection?.description,
      ...getItemCategories(collection),
      ...getTags(collection),
    ];
    const text = searchableParts.filter(Boolean).join(" ").toLowerCase();
    const imageCategories = [...getItemCategories(image), ...getItemCategories(collection)];
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesCategory = category === "All" || imageCategories.includes(category);
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
        text="Each collection includes free downloadable images and an optional paid prompt pack with the full template, ready-to-use prompts, and creative guidance."
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
  const category = collection?.primaryCategory || collection?.category || getItemCategories(collection)[0] || "Prompt Collection";
  const categories = getItemCategories(collection);
  const tags = getTags(collection);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="font-black uppercase tracking-wider text-purple-600">
            {category}
          </p>
          <h1 className="mt-3 text-4xl font-black text-[#17112B] sm:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {collection.description}
          </p>
          {(categories.length > 0 || tags.length > 0) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {[...categories, ...tags].slice(0, 12).map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm ring-1 ring-slate-100">
                  {item}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collectionImages.map((image) => (
              <ImageCard key={image.id} image={image} collection={collection} />
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <PromptPackBox
            link={getPromptPackLink(collection)}
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
  const category = getImageCategory(image, collection);
  const tags = [...getTags(image), ...getTags(collection)].slice(0, 12);

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
          {category}
        </p>
        <h1 className="mt-3 text-4xl font-black text-[#17112B]">{image.title}</h1>
        <p className="mt-4 text-slate-600">
          This image is free to download. It belongs to the{" "}
          <a className="font-black text-purple-600" href={`#/collection/${collection?.id}`}>
            {collection?.title || "prompt collection"}
          </a>{" "}
          prompt set.
        </p>
        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm ring-1 ring-slate-100">
                {tag}
              </span>
            ))}
          </div>
        )}
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
            href={getPromptPackLink(image, getPromptPackLink(collection))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#17112B] px-6 py-4 font-black text-white hover:bg-purple-600"
          >
            Unlock Prompt Pack — {PROMPT_PRICE}
          </a>
        </div>

        <div className="mt-8">
          <PromptPackBox
            link={getPromptPackLink(image, getPromptPackLink(collection))}
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
        label="Licence Terms"
        title="Licence terms, usage rights, and copyright."
        text="These terms explain how you may use PromptWagon free images and paid prompt packs. By downloading free images, purchasing prompt packs, or using this website, you agree to these terms."
      />

      <div className="mb-8 rounded-[2rem] bg-gradient-to-br from-[#17112B] to-purple-600 p-8 text-white shadow-[0_24px_80px_rgba(124,58,237,0.25)]">
        <h2 className="text-2xl font-black">Copyright notice</h2>
        <p className="mt-3 leading-8 text-white/85">
          © {CURRENT_YEAR} PromptWagon. All rights reserved. The PromptWagon
          website, logo, brand presentation, collection structure, prompt-pack
          files, written descriptions, catalogue content, page design, and
          supporting materials are protected and may not be copied, scraped,
          republished, resold, or redistributed as a competing image library,
          prompt marketplace, dataset, or digital product catalogue.
        </p>
      </div>

      <div className="space-y-6">
        <PolicyCard title="1. Free image licence">
          Free AI-generated images made available for download on PromptWagon may
          be used in personal and commercial creative projects. This includes use
          in websites, social media posts, presentations, videos, posters,
          mockups, product concepts, digital products, editorial layouts,
          advertising concepts, and other creative materials, provided the use
          complies with these terms.
        </PolicyCard>

        <PolicyCard title="2. Attribution">
          Attribution is appreciated but not required. Where practical, crediting
          PromptWagon or linking to promptwagon.com helps support the free image
          library and the creation of new collections.
        </PolicyCard>

        <PolicyCard title="3. Paid prompt-pack licence">
          Prompt packs purchased for {PROMPT_PRICE} through PromptWagon's external
          checkout are licensed to the buyer for unlimited personal and
          commercial creative use. Buyers
          may use the prompts to generate new images, adapt the prompts for their
          own workflow, and use resulting outputs in personal or commercial
          projects, subject to the rules of any AI tool or third-party platform
          used to generate those outputs.
        </PolicyCard>

        <PolicyCard title="4. Prompt-pack restrictions">
          You may not resell, redistribute, share publicly, upload, copy into
          another prompt marketplace, include in a competing prompt collection,
          or repackage the prompt-pack files themselves as a standalone product.
          The licence allows creative use of the prompts; it does not allow sale,
          transfer, public sharing, or distribution of the prompt pack.
        </PolicyCard>

        <PolicyCard title="5. Image redistribution restrictions">
          You may not resell, redistribute, mirror, scrape, bulk-download, or
          repackage PromptWagon free images as a competing standalone image
          library, stock image bundle, dataset, download collection, or
          marketplace product. The images are free for use in creative projects,
          not for cloning or competing with the PromptWagon library.
        </PolicyCard>

        <PolicyCard title="6. Prohibited uses">
          Do not use PromptWagon images, prompts, prompt-pack files, or generated
          outputs for unlawful, harmful, abusive, hateful, misleading,
          defamatory, deceptive, or rights-infringing purposes. Do not use them
          to misrepresent real people, organisations, products, events, evidence,
          endorsements, or factual claims. You are responsible for ensuring your
          use is lawful and appropriate for your intended platform, audience, and
          jurisdiction.
        </PolicyCard>

        <PolicyCard title="7. AI-generated content disclaimer">
          PromptWagon images, prompt examples, and related outputs may be
          AI-generated or AI-assisted. They may contain visual inaccuracies,
          fictional details, artefacts, unrealistic objects, or other limitations.
          You should review all images, prompts, and generated outputs carefully
          before publication, resale, advertising, or commercial use.
        </PolicyCard>

        <PolicyCard title="8. Third-party checkout and payment">
          Paid prompt packs and optional donations are processed securely through
          external checkout providers. Purchases, payment processing, receipts,
          refunds, account access, and digital delivery may be subject to the
          relevant checkout provider’s own terms and policies in addition to
          these PromptWagon licence terms.
        </PolicyCard>

        <PolicyCard title="9. No exclusivity">
          Free images and prompt packs are non-exclusive. Other users may
          download the same free images, purchase the same prompt packs, or
          create similar outputs using similar tools, prompts, models, styles, or
          workflows.
        </PolicyCard>

        <PolicyCard title="10. No warranty">
          PromptWagon provides images, prompt packs, descriptions, and related
          content “as is”, without warranty of any kind. PromptWagon does not
          guarantee that any image, prompt, generated output, file, description,
          or creative concept will be suitable for a specific commercial, legal,
          advertising, trademark, platform, professional, or regulatory use.
        </PolicyCard>

        <PolicyCard title="11. Updates to these terms">
          PromptWagon may update these licence terms from time to time as the
          library, prompt packs, platform integrations, pricing, delivery method,
          and commercial model develop. Continued use of the website, free
          downloads, or purchased prompt packs means you accept the latest
          version of these terms.
        </PolicyCard>

        <PolicyCard title="12. Contact">
          For licence questions, permissions, collaborations, or support, contact
          PromptWagon at info@promptwagon.com.
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
        title="Help keep PromptWagon growing."
        text="Images are free to download. Paid prompt packs and optional donations help support storage, organisation, new collections, and ongoing improvements."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-white shadow-[0_24px_80px_rgba(124,58,237,0.25)]">
          <h2 className="text-3xl font-black">Optional donations</h2>
          <p className="mt-3 text-white/80">
            Optional donations are processed securely through external checkout
            and help keep the free image library available.
          </p>
          <a
            href={KO_FI_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#17112B] hover:bg-amber-400"
          >
            Support PromptWagon
          </a>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <Mail className="text-purple-600" />
          <h2 className="mt-4 text-3xl font-black text-[#17112B]">Contact</h2>
          <p className="mt-3 text-slate-600">
            Questions about downloads, prompt packs, licensing, or collaborations? Contact PromptWagon directly.
          </p>
          <a
            href="mailto:info@promptwagon.com"
            className="mt-6 inline-flex rounded-full bg-[#17112B] px-6 py-3 font-black text-white hover:bg-purple-600"
          >
            info@promptwagon.com
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
