import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ConfirmModalProps {
  title: string;
  openModal: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  title,
  openModal,
  onOpenChange,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onCancel} variant={"secondary"}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
