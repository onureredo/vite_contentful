import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

function Contentful() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    client
      .getEntries()
      .then((response) => {
        setEntries(response.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {entries.map((entry) => {
        const date = new Date(entry.fields.releaseDate);
        const formattedDate = date.toLocaleDateString();

        return (
          <div key={entry.sys.id}>
            <h2>{entry.fields.title}</h2>
            <p>Relase Date: {formattedDate}</p>
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

export default Contentful;
