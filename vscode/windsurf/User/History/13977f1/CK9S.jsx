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

function DialogBox() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-gray-800 text-white rounded-sm m w-42 h-6 hover:bg-gray-800/90">
          Generate Quiz
        </div>
      </DialogTrigger>
      <DialogContent className={`font-inter font-[500] text-lg`}>
        <DialogHeader>
          <DialogTitle className={`text-3xl`}>Generate Questions</DialogTitle>
          <DialogDescription className={`text-lg`}>
            Tweak the settings to create questions just the way you like.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <SelectList
            value={generationSettings.questionType}
            onValueChange={(value) => changeQuestionType(value)}
            label="Question Type"
            itemsList={[{ value: "multiple-choice", label: "Multiple Choice" }]}
          />
          <SelectList
            value={generationSettings.questionCount}
            onValueChange={(value) => changeQuestionCount(value)}
            label="Choose how many questions to create"
            itemsList={Array.from({ length: 40 }, (_, i) => ({
              value: i + 1,
              label: i + 1,
            }))}
          />
        </div>
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
