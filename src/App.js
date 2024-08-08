import React, { useState } from 'react';
import gollum from './assets/gollum.jpeg';
import './App.css';
import { instructions } from './instructions';
import { Dialog, Typography, Paper } from '@mui/material';

const App = () => {
  const [search, setSearch] = useState('');
  const [linkTarget, setLinkTarget] = useState();
  const [multiLinkModalTarget, setMultiLinkModalTarget] = useState();

  const openLinks = (links) => {
    if (links.length < 1) return;
    else if (links.length === 1) {
      setLinkTarget(links[0]);
    } else {
      setMultiLinkModalTarget(links)
    }
  };

  const rows = instructions.filter(i => {
    const standardizedSearch = search.toLowerCase();
    if (!standardizedSearch ||
        i.name.toLowerCase().includes(standardizedSearch) ||
        i.number.toString().includes(standardizedSearch) ||
        i.theme.toLowerCase().includes(standardizedSearch)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className='container'>
      <header className='appHeader'>
        <img src={gollum} alt='logo' />
        <p>Lego Map Search</p>
      </header>
      <div className='body'>
        <input
          className='searchInput'
          value={search}
          placeholder='Search'
          onChange={e => setSearch(e.target.value)}
        />
        <table className='mapList'>
          <thead>
            <tr className='headerRow'>
              <th>Number</th>
              <th>Name</th>
              <th>Piece Count</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            { rows.map((row, i) =>
              <tr className='row' key={i}>
                <td>{row.number}</td>
                <td>{row.name}</td>
                <td>{row.pieceCount}</td>
                <td>
                  <a
                    className='instructionLink'
                    onClick={() => openLinks(row.links)}
                  >Open</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Dialog
          open={Boolean(multiLinkModalTarget)}
          onClose={() => setMultiLinkModalTarget(null)}
        >
          <Paper sx={{ padding: 1 }}>
            <Typography>
              This set contains multiple instructions. Which would you like to open?
            </Typography>
            { multiLinkModalTarget?.length > 0 && multiLinkModalTarget.map((link, i) =>
                <Typography
                  onClick={() => {
                    setLinkTarget(link);
                    setMultiLinkModalTarget(null);
                  }}
                  sx={{ cursor: 'pointer', color: '#8fd3fe' }}
                  key={i}
                >
                  {link}
                </Typography>
            )}
          </Paper>
        </Dialog>
        <Dialog
          open={Boolean(linkTarget)}
          onClose={() => setLinkTarget(null)}
          maxWidth='xl'
        >
          <Paper>
            <iframe src={linkTarget} style={{ border: 'none', width: '100vw', height: '100vh' }} />
          </Paper>
        </Dialog>
      </div>
    </div>
  );
};

export default App;
