import { useState } from "react";
import searchIcon from "../assets/search.png";
import api from "../api";

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {

        setLoading(true);
        try {
            const response = await api.get("/");
            let filteredUsers;

            if (inputText.length != 0) {
                filteredUsers = response.data.filter(user => 
                    user.name.toLowerCase().includes(inputText.toLowerCase()) ||
                    user.email.toLowerCase().includes(inputText.toLowerCase())
                );
            } else {
                filteredUsers = response.data;
            }

            setUsers(filteredUsers);
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4">
            
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">SearchFetch</h1>
                <p className="mb-8">Enter name or email and click on search icon</p>
                
                <div className="max-w-md mx-auto flex flex-row justify-between items-center border rounded-lg">
                    <input
                        type="text"
                        placeholder="Search name or email..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 outline-none"
                    />
                    <button 
                        onClick={handleSearch}
                        className="h-full px-4 cursor-pointer"
                    >
                        <img src={searchIcon} alt="Search" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <span className="ml-3">Loading...</span>
                    </div>
                )}

                {!loading && hasSearched && users.length === 0 && (
                    <div className="text-center border p-12">
                        <p>No user found: {inputText}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {!loading && users.map(user => (
                        <div key={user.id} className="border flex flex-col">
                            
                            <div className="border-b p-4">
                                <h3 className="text-xs">{user.name}</h3>
                                <p className="text-xs">{user.username}</p>
                            </div>

                            <div className="p-5 space-y-6 flex-grow">
                                <div className="grid grid-cols-1 gap-y-4 text-xs">
                                    <p>{user.email}</p>
                                    <p>{user.phone}</p>
                                    <p>{user.website}</p>
                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-xs">{user.company.name}</p>
                                    <p className="text-xs">"{user.company.catchPhrase}"</p>
                                    <p className="text-xs">{user.company.bs}</p>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="text-xs space-y-1">
                                        <p>{user.address.suite} {user.address.street}</p>
                                        <p>{user.address.city}, {user.address.zipcode}</p>
                                        
                                        <div className="flex gap-4 mt-3 pt-3 text-xs">
                                            <span>Lat: {user.address.geo.lat}</span>
                                            <span>Lng: {user.address.geo.lng}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}