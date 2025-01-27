import { GalleryVerticalEnd } from "lucide-react"
import { SignupForm } from "./Signup-form"

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Book Store Inc.
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
