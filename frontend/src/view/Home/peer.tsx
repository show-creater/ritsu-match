import { useEffect, useState } from 'react';
import Peer from 'skyway-js';

const peer = new Peer({
  key: 'YOUR_SKYWAY_API_KEY',
  debug: 3,
});

const ChatPeer = () => {
  const [peerId, setPeerId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    peer.on('open', id => {
      setPeerId(id);
    });

    peer.on('connection', conn => {
      setConnection(conn);
      conn.on('data', data => {
        setMessages(prevMessages => [...prevMessages, data]);
      });
    });
  }, []);

  const connectToPeer = () => {
    const conn = peer.connect(remoteId);
    setConnection(conn);
    conn.on('data', data => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
  };

  const sendMessage = () => {
    if (connection) {
      connection.send(message);
      setMessages(prevMessages => [...prevMessages, message]);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <span>Your ID: {peerId}</span>
      </div>
      <input
        type="text"
        value={remoteId}
        onChange={e => setRemoteId(e.target.value)}
        placeholder="Enter remote peer ID"
      />
      <button onClick={connectToPeer}>Connect</button>
      <div>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPeer;
