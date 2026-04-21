import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UrlInputSection({ onShorten }) {
  const handleClick = () => {
    const input = document.getElementById("url-input").value;
    onShorten(input);
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input placeholder="Enter your long URL" id="url-input" />
      <Button onClick={handleClick}>Shorten</Button>
    </div>
  );
}