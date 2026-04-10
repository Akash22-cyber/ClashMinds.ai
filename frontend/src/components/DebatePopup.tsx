import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronDown, UserPlus } from 'lucide-react';
import { useAtom } from 'jotai';
import { userAtom } from '@/state/userAtom';
import RoomBrowser from './RoomBrowser';
import Matchmaking from './Matchmaking';

interface DebatePopupProps {
  onClose: () => void;
}

const DebatePopup: React.FC<DebatePopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [roomCode, setRoomCode] = useState('');
  const [opponentId, setOpponentId] = useState('');
  const [friends, setFriends] = useState<{id: string, displayName: string, avatarUrl?: string}[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'matchmaking'>(
    'create'
  );

  useEffect(() => {
    if (activeTab === 'create' && user?.id) {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${import.meta.env.VITE_BASE_URL || 'http://localhost:1313'}/users/${user.id}/following`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (data.following) {
            setFriends(data.following);
          }
        })
        .catch(console.error);
      }
    }
  }, [activeTab, user?.id]);

  // Handler to join a debate room by sending the room code via navigation.
  const handleJoinRoom = () => {
    if (roomCode.trim() === '') return;
    navigate(`/debate-room/${roomCode}`);
    onClose();
  };

  // Handler to create a new room by sending a POST request to the backend.
  const handleCreateRoom = async () => {
    const token = localStorage.getItem('token');
    try {
      // Sending a POST request to create a new room.
      // You might also send additional parameters (e.g., room type, settings).
      const response = await fetch('http://localhost:1313/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // Here we send an example payload with the room type and opponentId if present.
        body: JSON.stringify({ type: opponentId ? 'invite' : 'public', opponentId }),
      });
      if (!response.ok) {
        alert('Error creating room.');
        return;
      }
      const room = await response.json();
      navigate(`/debate-room/${room.id}`);
      onClose();
    } catch (error) {
      alert('Error creating room.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      {/* Modal Card with a max-height so that it does not exceed the viewport */}
      <div className='relative bg-card text-foreground p-6 rounded-lg shadow-lg w-[42rem] flex flex-col max-h-[100vh]'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-muted-foreground hover:text-foreground'
        >
          <X size={20} />
        </button>

        {/* Tab Navigation */}
        <div className='flex mb-6 border-b border-border'>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'create'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'join'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Join Room
          </button>
          <button
            onClick={() => setActiveTab('matchmaking')}
            className={`px-4 py-2 font-medium transition ${
              activeTab === 'matchmaking'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            🎯 Matchmaking
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' && (
          <div className='flex flex-col items-center'>
            <h2 className='text-xl font-semibold mb-3'>Create a Debate</h2>
            <p className='text-muted-foreground text-sm text-center mb-6'>
              Start a new debate and select a friend to challenge, or leave empty to create a public room.
            </p>
            
            <div className="w-full relative mb-6">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground flex items-center justify-between hover:border-primary/50 transition-colors"
                type="button"
              >
                <div className="flex items-center gap-2 max-w-[85%]">
                  <UserPlus size={18} className="text-muted-foreground shrink-0" />
                  <span className="truncate">
                    {opponentId 
                      ? (friends.find(f => f.id === opponentId)?.displayName || `Custom ID: ${opponentId.substring(0,8)}${opponentId.length > 8 ? '...' : ''}`)
                      : 'Select Friend to Challenge (Optional)'}
                  </span>
                </div>
                <ChevronDown size={18} className="text-muted-foreground" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 flex flex-col max-h-80 overflow-hidden">
                  <div className="p-3 border-b border-border bg-muted/30 shrink-0">
                    <p className="text-xs text-muted-foreground mb-1.5 px-0.5">Or invite new friend by ID:</p>
                    <input 
                      type="text"
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Paste User ID..."
                      value={opponentId}
                      onChange={(e) => setOpponentId(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="overflow-y-auto">
                    <button
                      onClick={() => { setOpponentId(''); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition flex items-center gap-3 border-b border-border text-muted-foreground italic"
                    >
                       None (Create Public Room)
                    </button>
                  {friends.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                      No friends found. Follow some users first!
                    </div>
                  ) : (
                    friends.map((friend) => (
                      <button
                        key={friend.id}
                        onClick={() => { setOpponentId(friend.id); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={friend.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.id}`} 
                            alt={friend.displayName} 
                            className="w-8 h-8 rounded-full bg-secondary object-cover"
                          />
                          <span className="font-medium group-hover:text-primary transition-colors">{friend.displayName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                          <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">Online</span>
                        </div>
                      </button>
                    ))
                  )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleCreateRoom}
              className='bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition w-full'
            >
              Create Room
            </button>
          </div>
        )}

        {activeTab === 'join' && (
          <div className='flex flex-col items-center'>
            <h2 className='text-xl font-semibold mb-3'>Join a Debate</h2>
            <p className='text-muted-foreground text-sm text-center mb-6'>
              Enter a room code to join an ongoing debate.
            </p>
            <input
              type='text'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder='Enter Room Code'
              className='w-full p-3 border border-border rounded-lg text-center bg-input text-foreground mb-4'
            />
            <button
              onClick={handleJoinRoom}
              className='bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition w-full'
            >
              Join Room
            </button>
          </div>
        )}

        {activeTab === 'matchmaking' && (
          <div className='flex flex-col'>
            <h2 className='text-xl font-semibold mb-3 text-center'>
              Smart Matchmaking
            </h2>
            <p className='text-muted-foreground text-sm text-center mb-6'>
              Get automatically matched with opponents of similar skill level.
            </p>
            <div
              className='overflow-y-auto'
              style={{ maxHeight: 'calc(100vh - 400px)' }}
            >
              <Matchmaking />
            </div>
          </div>
        )}

        {/* RoomBrowser - only show when not in matchmaking tab */}
        {activeTab !== 'matchmaking' && (
          <div
            className='mt-8 overflow-y-auto'
            style={{ maxHeight: 'calc(100vh - 300px)' }}
          >
            <RoomBrowser />
          </div>
        )}
      </div>
    </div>
  );
};

export default DebatePopup;
