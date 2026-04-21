import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <div className="flex gap-2">
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onClose}>No</Button>
        </div>
      </div>
    </Dialog>
  );
}