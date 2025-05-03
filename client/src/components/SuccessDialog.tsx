import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">You're on the list!</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-muted-foreground">
              Thank you for joining our waitlist. We'll notify you as soon as Veritas is ready for you.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:justify-center gap-2 sm:gap-0 mt-5">
          <Button onClick={onClose} className="w-full">
            Great, thanks!
          </Button>
        </DialogFooter>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Share Veritas with your network:
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaTwitter className="text-lg" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaFacebook className="text-lg" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
