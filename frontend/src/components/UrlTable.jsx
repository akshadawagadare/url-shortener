import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function UrlTable({ urls, onRequestDelete }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Short URL</th>
          <th>Original URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
          <tr key={url.id}>
            <td>{url.shortUrl}</td>
            <td>{url.longUrl}</td>
            <td>
              <Button onClick={() => onRequestDelete(url.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}