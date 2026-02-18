import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description, 
  canonical, 
  image, 
  type = 'website',
  schema 
}) => {
  const siteName = 'Marine Biodiversity Conservation';
  const siteUrl = 'https://www.marinebiodiversityconservation.com';
  const defaultImage = '/img-1.jpeg';
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = canonical ? canonical : siteUrl;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  schema: PropTypes.object
};

export default SEO;
