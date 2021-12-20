import { Formik, Form, Field } from "formik";
import { useState } from "react";
import './header.css'
import './content.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos});
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            //llamar a api unplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
            {
              headers: {
                'Authorization': 'Client-ID 5Ll8TZx1EUKSGqPsinXqsTE_6zZmqqfgC3smVpDhVAE'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          { photos.map(photo =>
            <article key={ photo.id } onClick={() => open(photo.links.html)}>
              <img src={ photo.urls.regular }></img>
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>)}
        </div>
      </div>
    </div>
    
  );
}

export default App;
