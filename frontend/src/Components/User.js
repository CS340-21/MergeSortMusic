import './User.css'
import SavedPlaylistsAccordion from './SavedPlaylistsAccordion.js'
import NewPlaylistDialog from './NewPlaylistDialog.js'

const User = (props) => {
  return (
    <div>
        <div className="main_content_user">
          <h1 className="title">This is where you take control of your listening.</h1>
          <div className="saved_playlists">
            <NewPlaylistDialog>
            </NewPlaylistDialog>
            <SavedPlaylistsAccordion>
            </SavedPlaylistsAccordion>
            <SavedPlaylistsAccordion>
            </SavedPlaylistsAccordion>
          </div>
        </div>
    </div>
  );
};

export default User;