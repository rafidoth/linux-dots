import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DialogBox({ title, description, children }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-800/90">
          {title}
        </div>
      </DialogTrigger>
      <DialogContent className={`font-inter font-[500] text-lg`}>
        <DialogHeader>
          <DialogTitle className={`text-3xl`}>Generate Questions</DialogTitle>
          <DialogDescription className={`text-lg`}>
            {description}
            Tweak the settings to create questions just the way you like.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose>
            <Button asChild variant="secondary">
              <div>Cancel</div>
            </Button>{" "}
          </DialogClose>
          <DialogClose>
            <Button asChild>
              <div>Generate</div>
            </Button>{" "}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
