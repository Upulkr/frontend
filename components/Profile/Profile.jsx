import { CgProfile } from "react-icons/cg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfileUser = ({ user }) => {
  const route=useRouter()
  const decodedUser = decodeURIComponent(user);
  console.log(decodedUser);
  const clearLoaclStorageHandler = () => {
localStorage.removeItem("bookingId");
localStorage.removeItem("userId");
localStorage.removeItem("username");
toast.success("Signout Successful")
     window.location.reload();

  };
  return (
    <Sheet>
      <SheetTrigger>
        <CgProfile className="text-white text-4xl " />
      </SheetTrigger>
      {decodedUser && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{`Hi ${decodedUser}`}</SheetTitle>
            <SheetDescription>
              <Button onClick={clearLoaclStorageHandler}>Sign Out</Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default ProfileUser;
