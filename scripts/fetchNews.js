import fs from "fs";

const API_KEY = process.env.GNEWS_API_KEY;

const URL = `https://gnews.io/api/v4/top-headlines?lang=en&max=9&apikey=${API_KEY}`;

async function run() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    if (!data.articles) {
      throw new Error("Invalid response");
    }

    const cleaned = {
      updatedAt: new Date().toISOString(),
      articles: data.articles.map(a => ({
        title: a.title,
        url: a.url,
        image: a.image,
        source: a.source.name
      }))
    };

    fs.writeFileSync(
      "public/news.json",
      JSON.stringify(cleaned, null, 2)
    );

    console.log("✅ news.json updated");
  } catch (err) {
    console.error("❌ Failed:", err);
    process.exit(1);
  }
}

run();