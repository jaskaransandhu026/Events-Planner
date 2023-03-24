import classes from './PageContent.module.css';

// that syntax in the component argument is just object destructuring 
// for the props argument that would usually be passed in there.

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;