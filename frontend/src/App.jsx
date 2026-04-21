import { useState } from "react";
import UrlInputSection from "./components/UrlInputSection";
import UrlCard from "./components/UrlCard";
import UrlTable from "./components/UrlTable";
import ConfirmDialog from "./components/ConfirmDialog";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [recent, setRecent] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleShorten = (longUrl) => {
    if (!longUrl) return;
    const shortUrl = "https://short.ly/" + Math.random().toString(36).slice(2, 8);
    const newEntry = { id: Date.now().toString(), longUrl, shortUrl };
    setUrls([newEntry, ...urls]);
    setRecent(shortUrl);
  };

  const handleDelete = (id) => {
    setUrls(urls.filter(u => u.id !== id));
    setDialogOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>

      <UrlInputSection onShorten={handleShorten} />

      {recent && <UrlCard shortUrl={recent} />}

      <UrlTable
        urls={urls}
        onRequestDelete={(id) => {
          setDeleteId(id);
          setDialogOpen(true);
        }}
      />

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
}