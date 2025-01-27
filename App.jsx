import React, { useState } from "react";
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };
 
  const downloadSong = async () => {
    if (!URL) {
      console.log("Please enter a valid URL");
      return;
    }

    const songId = URL.split('/').pop(); // Extract song ID from URL

    const options = {
      method: "GET",
      url: "https://spotify-downloader9.p.rapidapi.com/downloadSong",
      params: { songId },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
      },
    };

    try {
      const rspn = await axios.request(options);
      console.log(rspn.data); // Log the response to check if the download link is correct
      if (rspn.data.data && rspn.data.data.downloadLink) {
        const downloadLink = rspn.data.data.downloadLink;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.target = "_blank";
        link.click();  // Simulate click to open the download in a new tab
      } else {
        console.log("No download link found in the API response.");
      }
    } catch (error) {
      console.error("Error downloading song:", error);
    }
  };

  return (
    <div className="h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-600 via-emerald-600 to-amber-500 flex items-center justify-center flex-col gap-y-5">
      <div className="flex items-center justify-center gap-x-2 text-xl font-bold">
        <SlSocialSpotify size={50} />
        <p>Song Downloader</p>
      </div>

      <div className="flex gap-x-2">
        <input
          type="url"
          className="h-10 w-[450px] border-none outline-none px-5 rounded-lg"
          onChange={handleURL}
          value={URL}
        />
        <button
          className="bg-white h-10 px-2 rounded-lg font-bold hover:bg-black hover:text-white"
          onClick={downloadSong}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
