import { useState } from "react"
import searchIcon from "../assets/search.png"

export default function Home() {
    const [inputText, setInputText] = useState('');

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col bg-gray-200">
        
        {/* search bar */}
        <div className="flex flex-row rounded-lg border-2 border-black mt-4 px-4 py-2 mx-auto">
            <input
                type="text"
                placeholder="Enter keywords"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent border-none"
            />
            <img src={searchIcon} alt="Search" className="w-6 h-6 ml-1" />
        </div>

        <p>Welcome to the search-fetch!</p>
        <p>Enter the key words into search bar and click on the search button.</p>
    </div>
  )
}
