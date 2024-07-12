import { CgProfile } from "react-icons/cg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../../components/ui/sheet";

const Page = ({ params }) => {
  const decodedUser = decodeURIComponent(params.user);
  return (
    <Sheet>
      <SheetTrigger>
        <CgProfile className="text-white text-4xl " />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Page;
