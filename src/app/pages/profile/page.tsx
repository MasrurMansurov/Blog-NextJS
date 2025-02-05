'use client'

import TabProfile from "@/app/components/tab-profile"
import { useStore } from "@/app/store/useStore"
import { CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building2, CircleUserRound, Fingerprint, Frown, LogOut, Mail, Phone, Settings } from "lucide-react"

const Profile = () => {
  const profile = useStore((state) => state.profile)
  const logOut = useStore((state) => state.logOut)

  if(profile === null){
    return <div className='flex items-center gap-[10px] justify-center mt-[100px]'>User Not Found <Frown/> </div>
  }

  const removeProfileFromLocalStorage = () => {
    localStorage.removeItem("profile")
    logOut()
    window.location.href = '/'
  }

  return (
    <div className="mt-[30px]" key={profile.id}>
      <div className='flex items-center gap-[50px]'>
        <div className="flex items-center gap-[7px]">
          <CircleUserRound className="size-[30px]" />
          <CardTitle className="text-[30px]">{profile.username}</CardTitle>
        </div>
        <div className="flex items-center gap-[10px]">
        <Settings className="size-[17px] cursor-pointer" />
        <Fingerprint className="size-[17px] cursor-pointer" />
        <button onClick={removeProfileFromLocalStorage}> <LogOut className="size-[17px] text-red-600" /> </button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className='flex gap-[30px] mt-[20px]'>
        <div className='flex items-center gap-[7px]'>
          <Mail/>
          <p>{profile.email}</p>
        </div>
        <Separator orientation="vertical" />
        <div className='flex items-center gap-[7px]'>
          <Building2/>
          <p>{profile.address.city}</p>
        </div>
        <Separator orientation="vertical" />
        <div className='flex items-center gap-[7px]'>
          <Phone/>
          <p>{profile.phone}</p>
        </div>
      </div>
      <TabProfile/>
    </div>
  )
}

export default Profile
