"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserImage } from "./UserImage"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContex"


const navigation=[
    {
        name:"Orders",
        href:"/order"
    },
    {
        name:"Cart Page",
        href:"/cart"
    },
    {
        name:"Check Out",
        href:"/checkout"
    },


]

export function DropDown() {
  const [position, setPosition] = React.useState("bottom")

  const {logout}=useAuth();
  const handleLogOut=()=>{
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
            <UserImage/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {navigation.map((obj)=>(
                <Link to={obj.href} key={obj.name}><DropdownMenuRadioItem value={obj.name}>{obj.name}</DropdownMenuRadioItem></Link>
            ))} 

          <DropdownMenuRadioItem value="Log Out" key="Log Out" onClick={handleLogOut}>Log Out</DropdownMenuRadioItem>

        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
