import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog"


export function AuthModel({isOpen, isClose}) {
    return (
        <Dialog open={isOpen} onOpenChange={isClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
