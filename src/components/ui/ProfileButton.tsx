import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSetRecoilState } from "recoil";
import { userStateAtom } from "@/store/atoms/userStateAtom";

const ProfileButton = () => {

    const setUser = useSetRecoilState(userStateAtom);

    const logoutFunction = () => {
        localStorage.removeItem("token");
        setUser({
            isLoading: false,
            userEmail: null,
            userType: null,
        });
        console.log("logged out"); 
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="shadcn.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                className="cursor-pointer">Profile 
                </DropdownMenuItem>
                <DropdownMenuItem
                className="cursor-pointer"> Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Subscription
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer" onClick={logoutFunction}>Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;