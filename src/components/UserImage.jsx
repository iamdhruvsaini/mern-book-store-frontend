import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  import { useAuth } from "@/context/AuthContex";


  export function UserImage() {
    const{currentUser}=useAuth();
   
  
    return (
      <Avatar>
        {
        currentUser.photoURL
        ?<AvatarImage src={currentUser?.photoURL} alt="@shadcn" />
        :<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        }
        
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  