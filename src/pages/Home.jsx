import { useState } from "react";
import searchIcon from "../assets/search.png";
import api from "../api";

export default function Home() {
    
    const [inputText, setInputText] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        try {
            const response = await api.get("/"); 
            
            const filteredUsers = response.data.filter(user => 
                user.name.toLowerCase().includes(inputText.toLowerCase()) ||
                user.email.toLowerCase().includes(inputText.toLowerCase())
            );

            setUsers(filteredUsers);
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden flex flex-col p-4">
            
            {/* search bar */}
            <div className="flex flex-row rounded-lg border-2 border-black mt-4 px-4 py-2 mx-auto bg-gray-50 items-center">
                <input
                    type="text"
                    placeholder="Enter names to search"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none focus:outline-none w-64"
                />
                <img 
                    src={searchIcon} 
                    alt="Search" 
                    className="w-6 h-6 mx-1 cursor-pointer" 
                    onClick={handleSearch}
                />
            </div>

            <div className="flex flex-col items-center mt-4 text-center">
                <p className="font-bold">Welcome to the search-fetch!</p>
                <p>Enter the keywords into search bar and click on the search button.</p>
            </div>

            <div className="mt-8 max-w-md mx-auto w-full">
                {loading && <p className="text-center">Loading...</p>}

                {!loading && hasSearched && users.length === 0 && (
                    <p className="text-center text-red-500">No users found matching "{inputText}"</p>
                )}

                {!loading && users.map(user => (
                    <div key={user.id} className="p-4 mb-2 border rounded shadow-sm bg-white">
                        <h3 className="font-bold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.username}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">City: {user.address.city}</p>
                        <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                        <p className="text-sm text-gray-600">Website: {user.website}</p>
                        {/* <p className="text-sm text-gray-600">Company: {user.company}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
}