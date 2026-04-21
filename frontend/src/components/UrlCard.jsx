import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

export default function UrlCard({ shortUrl }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <Card className="mb-6 p-4 flex justify-between items-center">
      <span>{shortUrl}</span>
      <Tooltip content="Copy URL">
        <Button onClick={copyToClipboard}>Copy</Button>
      </Tooltip>
    </Card>
  );
}