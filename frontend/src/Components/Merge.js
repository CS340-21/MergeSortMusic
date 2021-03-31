import './Merge.css'

const song_list = {
    songs : [
      { name: "Till I Collapse", artist: "Eminem", album: "The Eminem Show", img_src: "https://i.ytimg.com/vi/Obim8BYGnOE/maxresdefault.jpg"},
      { name: "100 Bad Days", artist: "AJR", album: "Neotheater", img_src: "https://i2.wp.com/thewestwordonline.com/wp-content/uploads/2019/05/FA4DF1CF-D5A1-4840-9E57-9DD614BD8DD7.jpeg?fit=800%2C450"},
      { name: "We Are Never Ever Getting Back Together", artist: "Taylor Swift", album: "Red", img_src: "https://images-na.ssl-images-amazon.com/images/I/61b1nEYZnnL._AC_SX522_.jpg"}
    ]
}

const Merge = (props) => {
  return (
    <div className="grid-container">
        <button className="song_button">
          <div className="left_song">
            <img className= "left_song_img" src={song_list.songs[0].img_src} alt={song_list.songs[0].name} />
            <h1>{song_list.songs[0].name}</h1>
            <h3>{song_list.songs[0].artist}</h3>
          </div>
        </button>
        <button className="song_button">
          <div className="right_song">
            <img className= "right_song_img" src={song_list.songs[1].img_src} alt={song_list.songs[1].name}/>
            <h1>{song_list.songs[1].name}</h1>
            <h3>{song_list.songs[1].artist}</h3>
          </div>
        </button>
    </div>
  );
};

export default Merge;