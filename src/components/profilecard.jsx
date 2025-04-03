import React, { useState } from "react";
import { MapPin, Mail, Phone, Pencil, Trash, User, ChevronRight, Heart } from "lucide-react";
import MapModal from "./MapModal";
import locations from "../data/locations";
import ProfileDetailModal from "./ProfileDetails";

const ProfileCard = ({ profile, isAdmin, onEdit, onDelete, onDetails }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const defaultImage = "https://via.placeholder.com/150?text=Profile";
  
  // Function to find location object based on the location string
  const findLocationCoordinates = (locationName) => {
    if (!locationName) return null;
    
    // Extract city name (assuming format like "City, State" or just "City")
    const cityPart = locationName.split(',')[0].trim();
    
    // Find the matching location from our locations array
    const matchedLocation = locations.find(loc => 
      loc.city.toLowerCase() === cityPart.toLowerCase()
    );
    
    return matchedLocation || { city: locationName }; // Return the found location or fallback
  };
  
  return (
    <div className="w-full max-w-xs h-full relative rounded-xl perspective-1000 group">
      {/* Card with gradient background */}
      <div className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-[1.02]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-700/15 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-700/15 rounded-full blur-2xl -ml-10 -mb-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
        
        {/* Main content wrapper */}
        <div className="relative p-5 h-full flex flex-col">
          {/* Profile header with gradient background */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-indigo-900/40 to-transparent rounded-t-xl"></div>
          
          {/* Profile image section */}
          <div className="flex justify-center relative z-10 mb-3">
            <div className="relative">
              {/* Glowing effect around profile image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full blur opacity-70 group-hover:animate-pulse"></div>
              <img
                src={profile.photoUrl || profile.image || defaultImage}
                alt={profile.name}
                className="w-20 h-20 rounded-full border-2 border-gray-800 shadow-lg object-cover relative z-10"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
          </div>
          
          {/* Name and location */}
          <div className="text-center mb-3 relative z-10">
            <h2 className="text-lg font-bold text-white  drop-shadow-lg">{profile.name}</h2>
            {/* <p className="text-indigo-300 flex items-center justify-center text-xs">
              <MapPin size={12} className="mr-1 text-indigo-400" strokeWidth={2} />
              {profile.location}
            </p> */}
          </div>
          
          {/* Styled divider */}
          <div className="flex items-center my-2">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
          </div>
          
          {/* Contact info with enhanced icons */}
          <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 border border-gray-700 shadow-md mb-3">
            <div className="flex items-center space-x-2 text-white mb-2">
              <div className="p-1.5 rounded-md bg-indigo-900/70 text-indigo-300">
                <Mail size={14} />
              </div>
              <span className="text-xs truncate flex-1">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div className="p-1.5 rounded-md bg-indigo-900/70 text-indigo-300">
                <Phone size={14} />
              </div>
              <span className="text-xs flex-1">{profile.phone}</span>
            </div>
          </div>
          
          {/* Interests */}
          {profile.interests && typeof profile.interests === 'string' && profile.interests.trim() !== '' && (
            <div className="mb-3">
              <div className="flex items-center mb-3">
                <Heart size={14} className="text-pink-500 mr-1.5" />
                <p className="text-s text-white font-medium">Interests</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.split(',').map((interest, index) => (
                  <span 
                    key={`interest-${index}`} 
                    className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-800/80 to-purple-800/80 text-white border border-indigo-600/40"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-indigo-900 hover:from-gray-700 hover:to-indigo-800 border border-gray-700 shadow-md transition-all"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin size={12} />
                Map
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 border border-indigo-700 shadow-md transition-all"
                onClick={() => setIsDetailOpen(true)}
              >
                <User size={12} />
                Details
                <ChevronRight size={12} className="ml-0.5" />
              </button>
            </div>

            {isAdmin && (
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-blue-900 hover:from-gray-700 hover:to-blue-800 border border-gray-700 shadow-md transition-all"
                  onClick={() => onEdit && onEdit(profile)}
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 border border-gray-700 shadow-md transition-all"
                  onClick={() => onDelete && onDelete(profile)}
                >
                  <Trash size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isMapOpen && (
        <MapModal 
          location={findLocationCoordinates(profile.location)} 
          onClose={() => setIsMapOpen(false)} 
        />
      )}

      {isDetailOpen && (
        <ProfileDetailModal 
          profile={profile} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProfileCard;