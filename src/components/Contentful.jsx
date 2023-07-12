import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: '22o80r3chpjd',
  accessToken: 'nRXiDfnL2oToKVO7_59GIVbJ1AB-1fJaNII3e7R3a6A',
});

function Contentful2() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    client
      .getEntries()
      .then((response) =>
        //   console.log(response))
        setEntries(response.items)
      )
      .catch(console.error);
  }, []);

  return (
    <div>
      {entries.map((entry) => {
        return (
          <div key={entry.sys.id}>
            <h2>{entry.fields.title}</h2>
            <p>Relase Date: {entry.fields.releaseDate}</p>
            <img
              src={entry.fields.image.fields.file.url}
              alt={entry.fields.title}
              width='50%'
            />
            <p>{entry.fields.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Contentful2;
