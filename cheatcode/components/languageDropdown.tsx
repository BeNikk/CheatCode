"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { languageOptions } from "./constants/languageOptions";
import { useState } from "react";

  
const LanguageDropdown = ({onSelectChange}:any) => {
  const [language,setLanguage]=useState(languageOptions[0].label);

    return (
        <div>
          <DropdownMenu>
  <DropdownMenuTrigger >
    
     <p className="bg-[#3B5998] text-white p-2 font-medium rounded-md shadow-sm">
     {language}
      </p> 
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Languages</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {languageOptions.map((language)=>(
      <DropdownMenuItem key={language.id} onClick={()=>{setLanguage(language.label); onSelectChange(language) }}>{language.label}</DropdownMenuItem>
    ))}

   
  </DropdownMenuContent>
</DropdownMenu>

        </div>
     );
}
 
export default LanguageDropdown;